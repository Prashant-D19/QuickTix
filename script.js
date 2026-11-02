
/* ==========================================
   QUICKTIX - COMPLETE JAVASCRIPT APPLICATION
========================================== */

/* 1. MOVIE DATABASE */

const movies = [
    {
        id: 1,
        title: "Interstellar",
        genre: "Sci-Fi",
        duration: "2h 49m",
        rating: "8.7",
        price: 250,
        image: "assets/images/interstellar.png",
        description: "A team of explorers travels beyond this galaxy to discover whether mankind has a future among the stars."
    },
    {
        id: 2,
        title: "Inception",
        genre: "Action",
        duration: "2h 28m",
        rating: "8.8",
        price: 220,
        image: "assets/images/inception.png",
        description: "A skilled thief enters people's dreams to steal secrets and is given an impossible mission: plant an idea in someone's mind."
    },
    {
        id: 3,
        title: "The Dark Knight",
        genre: "Drama",
        duration: "2h 32m",
        rating: "9.0",
        price: 280,
        image: "assets/images/the-dark-knight.png",
        description: "Batman faces the Joker, a criminal mastermind who brings chaos to Gotham City and challenges the city's sense of justice."
    },
    {
        id: 4,
        title: "Dune",
        genre: "Sci-Fi",
        duration: "2h 35m",
        rating: "8.5",
        price: 260,
        image: "assets/images/dune.png",
        description: "Paul Atreides travels to the dangerous desert planet Arrakis, where his family's destiny and the future of the universe collide."
    },
    {
        id: 5,
        title: "The Batman",
        genre: "Action",
        duration: "2h 56m",
        rating: "7.8",
        price: 240,
        image: "assets/images/batman.png",
        description: "A young Batman investigates a series of mysterious crimes and uncovers corruption hidden deep within Gotham City."
    },
    {
        id: 6,
        title: "Joker",
        genre: "Drama",
        duration: "2h 2m",
        rating: "8.4",
        price: 230,
        image: "assets/images/joker.png",
        description: "Arthur Fleck, a struggling comedian, faces rejection and isolation as his life takes a dark and disturbing turn."
    },
    {
        id: 7,
        title: "Shutter Island",
        genre: "Thriller",
        duration: "2h 18m",
        rating: "8.2",
        price: 250,
        image: "assets/images/Shutter-island.png",
        description: "A U.S. Marshal investigates the disappearance of a patient at a remote psychiatric facility, where nothing is as it seems."
    },
    {
        id: 8,
        title: "Gravity",
        genre: "Sci-Fi",
        duration: "1h 31m",
        rating: "7.7",
        price: 210,
        image: "assets/images/Gravity.png",
        description: "Two astronauts fight to survive after a space disaster leaves them stranded in orbit with limited oxygen and no easy way home."
    }
];


/* 2. GET HTML ELEMENTS */

const movieGrid = document.getElementById("movieGrid");
const searchInput = document.getElementById("searchInput");
const movieCount = document.getElementById("movieCount");
const noResults = document.getElementById("noResults");
const filterButtons = document.querySelectorAll(".filter-btn");

const bookingOverlay = document.getElementById("bookingOverlay");
const confirmationOverlay = document.getElementById("confirmationOverlay");

const closeBooking = document.getElementById("closeBooking");
const finishBooking = document.getElementById("finishBooking");
const confirmBooking = document.getElementById("confirmBooking");

const seatLayout = document.getElementById("seatLayout");
const selectedSeatsText = document.getElementById("selectedSeats");
const totalAmount = document.getElementById("totalAmount");


/* 3. DISPLAY MOVIES */

function displayMovies(movieList) {

    movieGrid.innerHTML = "";

    movieCount.textContent = movieList.length;

    noResults.style.display =
        movieList.length === 0 ? "block" : "none";

    movieList.forEach(movie => {

        const movieCard = document.createElement("div");

        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <div class="movie-poster">
                <img src="${movie.image}" alt="${movie.title}" loading="lazy">

                <div class="movie-rating">
                    ★ ${movie.rating}
                </div>
            </div>

            <div class="movie-info">
                <h3>${movie.title}</h3>

                <p class="movie-meta">
                    ${movie.genre} • ${movie.duration}
                </p>

                <div class="movie-bottom">
                    <span class="movie-price">₹${movie.price}</span>

<button class="details-btn" data-movie-id="${movie.id}">
    View Details
</button>

<button class="book-btn" data-movie-id="${movie.id}">
    Book Now
</button>
                </div>
            </div>
        `;

        movieGrid.appendChild(movieCard);

    });

}


/* 4. SEARCH AND FILTER MOVIES */

let selectedGenre = "All";

function filterMovies() {

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredMovies = movies.filter(movie => {

        const matchesSearch =
            movie.title.toLowerCase().includes(searchText);

        const matchesGenre =
            selectedGenre === "All" ||
            movie.genre === selectedGenre;

        return matchesSearch && matchesGenre;

    });

    displayMovies(filteredMovies);

}

searchInput.addEventListener("input", filterMovies);


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedGenre = button.dataset.genre;

        filterMovies();

    });

});


/* 5. BOOKING VARIABLES */

let currentMovie = null;
let selectedSeats = [];
let selectedDate = "";
let selectedTime = "10:30 AM";

// Refresh seats when cinema changes
document.getElementById("cinemaSelect").addEventListener("change", () => {
    selectedSeats = [];
    generateSeats();
    updateBookingSummary();
});
/* 6. OPEN BOOKING WINDOW */

/* MOVIE DETAILS POPUP */

movieGrid.addEventListener("click", event => {
    const detailsButton = event.target.closest(".details-btn");

    if (!detailsButton) return;

    const movieId = Number(detailsButton.dataset.movieId);

    const movie = movies.find(item => item.id === movieId);

    if (!movie) return;

    document.getElementById("detailsMovieImage").src = movie.image;
    document.getElementById("detailsMovieTitle").textContent = movie.title;
    document.getElementById("detailsMovieTitle").dataset.movieId = movie.id;
    document.getElementById("detailsMovieRating").textContent = "★ " + movie.rating;
    document.getElementById("detailsMovieGenre").textContent = movie.genre;
    document.getElementById("detailsMovieDuration").textContent = movie.duration;
    document.getElementById("detailsMovieDescription").textContent = movie.description;
    document.getElementById("detailsMoviePrice").textContent = "₹" + movie.price;

    document.getElementById("movieDetailsOverlay").classList.add("show");
});

/* CLOSE MOVIE DETAILS */

document.getElementById("closeMovieDetails").addEventListener("click", () => {
    document.getElementById("movieDetailsOverlay").classList.remove("show");
});

/* CLOSE WHEN CLICKING OUTSIDE */

document.getElementById("movieDetailsOverlay").addEventListener("click", event => {
    if (event.target.id === "movieDetailsOverlay") {
        event.currentTarget.classList.remove("show");
    }
});

/* CLOSE MOVIE DETAILS WITH ESCAPE KEY */

document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
        document.getElementById("movieDetailsOverlay").classList.remove("show");
    }
});/* BOOK TICKETS FROM DETAILS */

/* BOOK TICKETS FROM DETAILS */

document.getElementById("detailsBookBtn").addEventListener("click", () => {
    const movieId = Number(
        document.getElementById("detailsMovieTitle").dataset.movieId
    );

    document.getElementById("movieDetailsOverlay").classList.remove("show");

    const bookButton = movieGrid.querySelector(
        `.book-btn[data-movie-id="${movieId}"]`
    );

    if (bookButton) {
        bookButton.click();
    }
});
movieGrid.addEventListener("click", event => {

    const button = event.target.closest(".book-btn");

    if (!button) return;

    const movieId = Number(button.dataset.movieId);

    currentMovie = movies.find(movie => movie.id === movieId);

    if (!currentMovie) return;

    selectedSeats = [];
    selectedTime = "10:30 AM";

    document.getElementById("bookingMovieName").textContent =
        currentMovie.title;

    document.getElementById("bookingMovieDetails").textContent =
        `${currentMovie.genre} • ${currentMovie.duration} • ★ ${currentMovie.rating}`;

    document.getElementById("cinemaSelect").selectedIndex = 0;

    bookingOverlay.classList.add("show");

    generateDates();
    generateSeats();
    updateBookingSummary();

    document.querySelectorAll(".time-btn").forEach(btn => {

        btn.classList.toggle(
            "active",
            btn.dataset.time === selectedTime
        );

    });

});


/* 7. CLOSE BOOKING WINDOW */

closeBooking.addEventListener("click", () => {

    bookingOverlay.classList.remove("show");

});

bookingOverlay.addEventListener("click", event => {

    if (event.target === bookingOverlay) {
        bookingOverlay.classList.remove("show");
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        bookingOverlay.classList.remove("show");
        confirmationOverlay.classList.remove("show");
    }

});


/* 8. GENERATE DATES */

function generateDates() {

    const dateContainer = document.getElementById("dateOptions");

    dateContainer.innerHTML = "";

    const today = new Date();

    for (let i = 0; i < 5; i++) {

        const date = new Date(today);

        date.setDate(today.getDate() + i);

        const dateValue = date.toISOString().split("T")[0];

        const button = document.createElement("button");

        button.classList.add("date-btn");

        button.textContent = date.toLocaleDateString("en-IN", {
            weekday: "short",
            day: "numeric",
            month: "short"
        });

        button.dataset.date = dateValue;

        if (i === 0) {

            button.classList.add("active");
            selectedDate = dateValue;

        }

        button.addEventListener("click", () => {

            document.querySelectorAll(".date-btn").forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedDate = dateValue;
            selectedSeats = [];
generateSeats();
updateBookingSummary();

        });

        dateContainer.appendChild(button);

    }

}


/* 9. SELECT SHOWTIME */

document.querySelectorAll(".time-btn").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll(".time-btn").forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        selectedTime = button.dataset.time;
        selectedSeats = [];
generateSeats();
updateBookingSummary();

    });

});


/* 10. GENERATE CINEMA SEATS */


/* 10. GENERATE CINEMA SEATS WITH BOOKING AVAILABILITY */

function generateSeats() {

    seatLayout.innerHTML = "";

    const rows = ["A", "B", "C", "D", "E"];

    // Demo seats that are already occupied
    const demoOccupiedSeats = [];


    // Get previously saved bookings
    const allBookings = JSON.parse(
        localStorage.getItem("quickTixBookings") || "[]"
    );

    // Get bookings for this exact movie, cinema, date and showtime
    const currentCinema = document.getElementById("cinemaSelect").value;

    const matchingBookings = allBookings.filter(booking =>
        booking.movie === currentMovie.title &&
        booking.cinema === currentCinema &&
        booking.date === selectedDate &&
        booking.time === selectedTime
    );

    // Collect seats already booked for this show
    const previouslyBookedSeats = matchingBookings.flatMap(
        booking => booking.seats
    );

    // Combine demo occupied seats and previously booked seats
    const occupiedSeats = [
        ...new Set([...demoOccupiedSeats, ...previouslyBookedSeats])
    ];

    rows.forEach(row => {

        const rowElement = document.createElement("div");
        rowElement.classList.add("seat-row");

        const rowLabel = document.createElement("span");
        rowLabel.classList.add("row-label");
        rowLabel.textContent = row;

        rowElement.appendChild(rowLabel);

        for (let i = 1; i <= 8; i++) {

            const seatName = row + i;

            const seat = document.createElement("button");

            seat.classList.add("seat");
            seat.textContent = i;
            seat.dataset.seat = seatName;

            // Mark unavailable seats
            if (occupiedSeats.includes(seatName)) {

                seat.classList.add("occupied");
                seat.disabled = true;

            }

            // Handle seat selection
            seat.addEventListener("click", () => {
                toggleSeat(seatName, seat);
            });

            rowElement.appendChild(seat);

        }

        seatLayout.appendChild(rowElement);

    });

}

/* Sync seat availability across browser tabs */

window.addEventListener("storage", function (event) {
    if (event.key !== "quickTixBookings") return;

    // Refresh only if the booking window is currently open
    if (bookingOverlay.classList.contains("show") && currentMovie) {
        // Clear selections to prevent selecting a newly booked seat
        selectedSeats = [];

        // Rebuild the seat layout using the latest bookings
        generateSeats();

        // Refresh the total amount
        updateBookingSummary();
    }
});
/* 11. SELECT AND DESELECT SEATS */

function toggleSeat(seatName, seatElement) {

    if (selectedSeats.includes(seatName)) {

        selectedSeats = selectedSeats.filter(
            seat => seat !== seatName
        );

        seatElement.classList.remove("selected");

    } else {

        if (selectedSeats.length >= 8) {

            alert("You can select a maximum of 8 seats.");

            return;

        }

        selectedSeats.push(seatName);

        seatElement.classList.add("selected");

    }

    updateBookingSummary();

}


/* 12. AUTOMATIC PRICE CALCULATION */

function updateBookingSummary() {

    selectedSeatsText.textContent =
        selectedSeats.length > 0
            ? selectedSeats.join(", ")
            : "None";

    const total = currentMovie
        ? currentMovie.price * selectedSeats.length
        : 0;

    totalAmount.textContent = `₹${total}`;

    confirmBooking.disabled = selectedSeats.length === 0;

}


/* 13. CONFIRM BOOKING */

confirmBooking.addEventListener("click", () => {

    if (!currentMovie || selectedSeats.length === 0) {

        alert("Please select at least one seat.");

        return;

    }

    const bookingId =
        "QT" + Date.now().toString().slice(-8);

    const booking = {

        bookingId: bookingId,

        movie: currentMovie.title,

        cinema: document.getElementById("cinemaSelect").value,

        date: selectedDate,

        time: selectedTime,

        seats: [...selectedSeats],

        amount: currentMovie.price * selectedSeats.length

    };

    // Save booking in browser storage

    const bookings = JSON.parse(
        localStorage.getItem("quickTixBookings") || "[]"
    );
// Check whether any selected seat is already booked
const currentCinema = document.getElementById("cinemaSelect").value;

const conflictingBooking = bookings.find(existingBooking =>
    existingBooking.movie === currentMovie.title &&
    existingBooking.cinema === currentCinema &&
    existingBooking.date === selectedDate &&
    existingBooking.time === selectedTime &&
    existingBooking.seats.some(seat => selectedSeats.includes(seat))
);

if (conflictingBooking) {
    alert("Sorry! One or more selected seats have already been booked. Please select different seats.");
    generateSeats();
    return;
}
    bookings.push(booking);

    localStorage.setItem(
        "quickTixBookings",
        JSON.stringify(bookings)
    );

    showConfirmation(booking);

});


/* 14. DISPLAY BOOKING CONFIRMATION */


function showConfirmation(booking) {

    bookingOverlay.classList.remove("show");

    const details = document.getElementById("confirmationDetails");

    
details.innerHTML = `
  <div class="digital-ticket">

    <div class="ticket-top">
      <div class="ticket-brand">
        <span class="ticket-brand-icon">Q</span>
        <div>
          <h2>QuickTix</h2>
          <p>YOUR MOVIE EXPERIENCE</p>
        </div>
      </div>
      <div class="ticket-status">
        <span>✓</span> BOOKING CONFIRMED
      </div>
    </div>

    <div class="ticket-movie">
      <p class="ticket-eyebrow">YOUR SHOW IS BOOKED</p>
      <h2>${booking.movie}</h2>
      <p class="ticket-cinema">${booking.cinema}</p>
    </div>

    <div class="ticket-divider">
      <span></span>
    </div>

    <div class="ticket-details-grid">
      <div class="ticket-detail">
        <span>BOOKING ID</span>
        <strong>${booking.bookingId}</strong>
      </div>

      <div class="ticket-detail">
        <span>DATE</span>
        <strong>${booking.date}</strong>
      </div>

      <div class="ticket-detail">
        <span>SHOWTIME</span>
        <strong>${booking.time}</strong>
      </div>

      <div class="ticket-detail">
        <span>SEATS</span>
        <strong>${booking.seats.join(", ")}</strong>
      </div>
    </div>

    <div class="ticket-total">
      <div>
        <span>TOTAL AMOUNT</span>
        <strong>₹${booking.amount}</strong>
      </div>
      <span class="ticket-paid">DEMO BOOKING</span>
    </div>

    <div class="ticket-qr-section">
      <div class="ticket-qr-copy">
        <h3>Your Entry Pass</h3>
        <p>Scan the QR code to view your booking details.</p>
        <small>Keep this ticket handy at the cinema.</small>
      </div>
      <div class="ticket-qr-code">
        <div id="bookingQr"></div>
      </div>
    </div>

    <div class="ticket-bottom">
      <span>QUICKTIX</span>
      <span>YOUR MOVIE. YOUR SEATS. YOUR EXPERIENCE.</span>
    </div>

  </div>
`;

    // Generate a QR code containing booking information
    const qrData = JSON.stringify({
        bookingId: booking.bookingId,
        movie: booking.movie,
        cinema: booking.cinema,
        date: booking.date,
        time: booking.time,
        seats: booking.seats,
        amount: booking.amount
    });

    const qrContainer = document.getElementById("bookingQr");

    if (typeof QRCode !== "undefined") {
        new QRCode(qrContainer, {
            text: qrData,
            width: 150,
            height: 150,
            colorDark: "#10121D",
            colorLight: "#FFFFFF",
            correctLevel: QRCode.CorrectLevel.H
        });
    } else {
        qrContainer.textContent = "QR code unavailable";
    }

    confirmationOverlay.classList.add("show");
}



/* 15. FINISH BOOKING */

finishBooking.addEventListener("click", () => {

    confirmationOverlay.classList.remove("show");

    currentMovie = null;

    selectedSeats = [];

    updateBookingSummary();

});


/* 16. INITIALIZE WEBSITE */

displayMovies(movies);

console.log("QuickTix application started successfully!");
// BACK TO MOVIES BUTTON
const backToMoviesBtn = document.getElementById("backToMovies");

if (backToMoviesBtn) {
    backToMoviesBtn.addEventListener("click", () => {
        document.getElementById("movies").scrollIntoView({
            behavior: "smooth"
        });
    });
}

/* ==========================================
   17. MY BOOKINGS - DISPLAY SAVED BOOKINGS
========================================== */

const bookingsList = document.getElementById("bookingsList");
const emptyBookings = document.getElementById("emptyBookings");

function displayBookings() {
    const bookings = JSON.parse(
        localStorage.getItem("quickTixBookings") || "[]"
    );

    if (!bookingsList || !emptyBookings) return;

    bookingsList.innerHTML = "";

    if (bookings.length === 0) {
        emptyBookings.style.display = "block";
        bookingsList.style.display = "none";
        return;
    }

    emptyBookings.style.display = "none";
    bookingsList.style.display = "grid";

    bookings.forEach((booking, index) => {
        const bookingCard = document.createElement("div");

        bookingCard.classList.add("booking-card");

        bookingCard.innerHTML = `
            <div class="booking-card-header">
                <h3>${booking.movie}</h3>
                <span>Confirmed</span>
            </div>

            <p><strong>Booking ID:</strong> ${booking.bookingId}</p>
            <p><strong>Cinema:</strong> ${booking.cinema}</p>
            <p><strong>Date:</strong> ${booking.date}</p>
            <p><strong>Showtime:</strong> ${booking.time}</p>
            <p><strong>Seats:</strong> ${booking.seats.join(", ")}</p>

            <div class="booking-card-footer">
                <strong>Total: ₹${booking.amount}</strong>
                <button class="cancel-btn" data-index="${index}">
                    Cancel Booking
                </button>
            </div>
        `;

        bookingsList.appendChild(bookingCard);
    });
}


/* Display bookings when My Bookings is opened */

const myBookingsLink = document.querySelector(
    'a[href="#myBookings"]'
);

if (myBookingsLink) {
    myBookingsLink.addEventListener("click", displayBookings);
}


/* Custom Cancel Booking Confirmation */

let pendingCancelIndex = null;

if (bookingsList) {
    bookingsList.addEventListener("click", function (event) {
        const cancelButton = event.target.closest(".cancel-btn");

        if (!cancelButton) return;

        pendingCancelIndex = Number(cancelButton.dataset.index);

        document
            .getElementById("cancelConfirmOverlay")
            .classList.add("show");
    });
}

// Keep Booking button
document.getElementById("keepBookingBtn").addEventListener("click", () => {
    document
        .getElementById("cancelConfirmOverlay")
        .classList.remove("show");

    pendingCancelIndex = null;
});

// Yes, Cancel Booking button
document.getElementById("confirmCancelBtn").addEventListener("click", () => {
    if (pendingCancelIndex === null) return;

    const bookings = JSON.parse(
        localStorage.getItem("quickTixBookings") || "[]"
    );

    bookings.splice(pendingCancelIndex, 1);

    localStorage.setItem(
        "quickTixBookings",
        JSON.stringify(bookings)
    );

    document
        .getElementById("cancelConfirmOverlay")
        .classList.remove("show");

    pendingCancelIndex = null;

    displayBookings();
});


/* Explore Movies button */

const exploreFromBookings = document.getElementById(
    "exploreFromBookings"
);

if (exploreFromBookings) {
    exploreFromBookings.addEventListener("click", function() {
        document.getElementById("movies").scrollIntoView({
            behavior: "smooth"
        });
    });
}


/* Load saved bookings */

displayBookings();
// DOWNLOAD TICKET AS PDF

document.getElementById("downloadTicket").addEventListener("click", () => {
    const ticket = document.querySelector(
        "#confirmationDetails .digital-ticket"
    );

    if (!ticket) {
        alert("Ticket details not found.");
        return;
    }

    const printWindow = window.open("", "_blank");

    if (!printWindow) {
        alert("Please allow pop-ups to download your ticket.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>QuickTix - Movie Ticket</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                * {
                    box-sizing: border-box;
                }

                body {
                    margin: 0;
                    padding: 35px;
                    background: #f1f0f8;
                    font-family: Arial, sans-serif;
                    color: #ffffff;
                }

                .digital-ticket {
                    max-width: 650px;
                    margin: 20px auto;
                    padding: 35px;
                    background: linear-gradient(145deg, #191d2b, #25213e);
                    border: 2px solid #8b5cf6;
                    border-radius: 22px;
                    box-shadow: 0 15px 40px rgba(0,0,0,0.15);
                    color: #ffffff;
                }

                .ticket-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding-bottom: 22px;
                    border-bottom: 1px solid #45405d;
                }

                .ticket-logo {
                    font-size: 27px;
                    font-weight: 800;
                    color: white;
                }

                .ticket-logo span {
                    color: #a78bfa;
                }

                .ticket-status {
                    background: #123d32;
                    color: #65e6a5;
                    padding: 10px 14px;
                    border-radius: 30px;
                    font-size: 11px;
                    font-weight: bold;
                }

                .ticket-label {
                    color: #a78bfa;
                    font-size: 11px;
                    letter-spacing: 2px;
                    font-weight: bold;
                    margin-top: 30px;
                }

                .ticket-movie h2 {
                    font-size: 34px;
                    margin: 12px 0;
                    color: white;
                }

                .ticket-movie p {
                    color: #c5c1d5;
                }

                .ticket-divider {
                    border-top: 1px dashed #69617e;
                    margin: 28px 0;
                }

                .ticket-info {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 25px;
                }

                .ticket-info span {
                    display: block;
                    color: #aaa3c0;
                    font-size: 10px;
                    letter-spacing: 1px;
                    margin-bottom: 9px;
                }

                .ticket-info strong {
                    font-size: 15px;
                    color: white;
                }

                .ticket-qr-section {
                    text-align: center;
                    background: white;
                    color: #202235;
                    padding: 25px;
                    margin-bottom: 25px;
                    border-radius: 15px;
                    margin-top: 30px;
                }

                .ticket-qr-section p {
                    color: #45475a;
                    font-size: 13px;
                }

                .ticket-qr-section img,
                .ticket-qr-section canvas {
                    margin: 15px auto;
                }

                .ticket-footer {
                    margin-top: 25px;
                    padding-top: 20px;
                    border-top: 1px solid #45405d;
                    color: #aaa3c0;
                    font-size: 10px;
                    letter-spacing: 2px;
                    line-height: 2;
                }

                @page {
                    size: A4;
                    margin: 15mm;
                }

                @media print {
                    body {
                        background: white;
                        padding: 0;
                    }

                    .digital-ticket {
                        margin: 0 auto;
                        box-shadow: none;
                        break-inside: avoid;
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
          .ticket-details-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    margin: 25px 0;
}

.ticket-detail {
    background: #252a40;
    border: 1px solid #414766;
    border-radius: 10px;
    padding: 15px;
}

.ticket-detail span {
    display: block;
    color: #a78bfa;
    font-size: 11px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 1px;
}

.ticket-detail strong {
    color: white;
    font-size: 15px;
}

.ticket-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #302653;
    border: 1px solid #8b5cf6;
    border-radius: 12px;
    padding: 20px;
    margin: 20px 0;
}

.ticket-total strong {
    font-size: 25px;
    color: #c4b5fd;
}

.ticket-paid {
    color: #86efac;
    font-size: 11px;
    font-weight: bold;
}
                </style>
        </head>
        <body>
            ${ticket.outerHTML}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.focus();

    setTimeout(() => {
        printWindow.print();
    }, 700);
});

// PRINT TICKET
// PRINT TICKET
document.getElementById("printTicket").addEventListener("click", () => {
    document.getElementById("downloadTicket").click();
});
/* MOBILE HAMBURGER MENU */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "✕" : "☰";
});

/* CLOSE MENU AFTER CLICKING A NAVIGATION LINK */

navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});