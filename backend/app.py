from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS 
import datetime

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

# Configuración de la base de datos con autenticación de Windows
app.config['SQLALCHEMY_DATABASE_URI'] = (
    'mssql+pyodbc://@DESKTOP-UT15PH2/AgroJardin?driver=ODBC+Driver+17+for+SQL+Server&trusted_connection=yes'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelo de productos
class Producto(db.Model):
    __tablename__ = 'productos'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255))
    descripcion = db.Column(db.Text)
    precio = db.Column(db.Numeric(10, 2))
    imagen = db.Column(db.String(255))

# Modelos
class Venta(db.Model):
    __tablename__ = 'ventas'
    id = db.Column(db.Integer, primary_key=True)
    fecha = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    total = db.Column(db.Numeric(10, 2))
    estado = db.Column(db.String(50))

class DetalleVenta(db.Model):
    __tablename__ = 'detalleventas'
    id = db.Column(db.Integer, primary_key=True)
    id_venta = db.Column(db.Integer, db.ForeignKey('ventas.id'))
    id_producto = db.Column(db.Integer)
    cantidad = db.Column(db.Integer)
    precio = db.Column(db.Numeric(10, 2))


# Ruta de prueba
@app.route('/api/test')
def test():
    return jsonify({"message": "Conexión exitosa"})

# Ruta para obtener todos los productos
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        productos = Producto.query.all()
        resultado = []
        for p in productos:
            resultado.append({
                "id": p.id,
                "nombre": p.nombre,
                "descripcion": p.descripcion,
                "precio": float(p.precio),
                "imagen": p.imagen
            })
        return jsonify(resultado)
    except Exception as e:
        return jsonify({"message": f"Error al obtener los productos: {str(e)}"}), 500

# Ruta para registrar una venta
@app.route('/api/ventas', methods=['POST'])
def registrar_venta():
    try:
        data = request.get_json()
        total = data['total']
        estado = data['estado']
        productos = data['productos']

        venta = Venta(total=total, estado=estado)
        db.session.add(venta)
        db.session.flush()  # Obtener ID antes de commit

        for p in productos:
            detalle = DetalleVenta(
                id_venta=venta.id,
                id_producto=p['id_producto'],
                cantidad=p['cantidad'],
                precio=p['precio']
            )
            db.session.add(detalle)

        db.session.commit()
        return jsonify({"message": "Venta registrada correctamente", "venta_id": venta.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al registrar la venta: {str(e)}"}), 500

# Ruta para crear un nuevo producto
@app.route('/api/products', methods=['POST'])
def add_product():
    try:
        data = request.get_json()
        nuevo_producto = Producto(
            nombre=data['nombre'],
            descripcion=data['descripcion'],
            precio=data['precio'],
            imagen=data['imagen']
        )
        db.session.add(nuevo_producto)
        db.session.commit()
        return jsonify({'message': 'Producto agregado correctamente'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error al agregar producto: {str(e)}'}), 500

# Ruta para actualizar un producto
@app.route('/api/products/<int:id>', methods=['PUT'])
def update_product(id):
    data = request.get_json()
    if not data:
        return jsonify({"message": "Faltan datos en la solicitud"}), 400
    try:
        producto = Producto.query.get(id)
        if producto is None:
            return jsonify({"message": "Producto no encontrado"}), 404

        producto.nombre = data['nombre']
        producto.descripcion = data['descripcion']
        producto.precio = data['precio']
        producto.imagen = data['imagen']

        db.session.commit()
        return jsonify({"message": "Producto actualizado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al actualizar el producto: {str(e)}"}), 500

# Ruta para eliminar un producto
@app.route('/api/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    try:
        producto = Producto.query.get(id)
        if producto is None:
            return jsonify({"message": "Producto no encontrado"}), 404

        db.session.delete(producto)
        db.session.commit()
        return jsonify({"message": "Producto eliminado exitosamente"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": f"Error al eliminar el producto: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
