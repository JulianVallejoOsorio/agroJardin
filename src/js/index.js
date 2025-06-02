document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".section_card");
    const prevBtn = document.querySelector(".carrousel_control.prev");
    const nextBtn = document.querySelector(".carrousel_control.next");
    let currentCardIndex = 0;
    const showCard = (index, direction) => {


        cards.forEach(card => {
            card.style.opacity = "0";
            card.style.transform = `translateX(${direction === 'next' ? '' : '-'}100%)`;
            card.classList.remove("show")
        })


        cards[index].classList.add("show")
        setTimeout(() => {
            cards.forEach(card => card.style.transition = "opacity 0.5s, transform 0.5s");
            cards[index].style.opacity = "1";
            cards[index].style.transform = "translateX(0)";
        }, 50)

    }

    const changeCard = (increment, direction) => {
        currentCardIndex = (currentCardIndex + increment + cards.length) % cards.length;
        showCard(currentCardIndex, direction)
    }

    const autoScroll = () => {
        changeCard(1, 'next')
    }

    nextBtn.addEventListener("click", (event) => {
        event.preventDefault();
        changeCard(1, 'next');
    })

    prevBtn.addEventListener("click", (event) => {
        event.preventDefault();
        changeCard(-1, 'prev');
    })

    let autoScrollInterval = setInterval(autoScroll, 5000)

    document.querySelector('.carrousel-section').addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    })

    document.querySelector('.carrousel-section').addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(autoScroll, 5000)
    })

})
