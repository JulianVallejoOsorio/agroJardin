import pyodbc

def get_connection():
    try:
        conn = pyodbc.connect('DRIVER={ODBC Driver 17 for SQL Server};'
                              'SERVER=DESKTOP-UT15PH2;'
                              'DATABASE=agroJardin;'
                              'Trusted_Connection=yes;')
        return conn
    except Exception as e:
        print(f"Error de conexión: {e}")
        return None
