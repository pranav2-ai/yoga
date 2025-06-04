document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMobileMenuButton = document.getElementById('close-mobile-menu');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const bookingForm = document.getElementById('booking-form');
    const bookingDateSelect = document.getElementById('booking-date');
    const bookingTimeSelect = document.getElementById('booking-time');
    const bookingMessageDiv = document.getElementById('booking-message');
    const header = document.querySelector('header');
    const headerNavLinks = document.querySelectorAll('header nav div.md\\:flex a');
    const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
    const logoText = document.getElementById('logo-text');

    // Toggle mobile menu
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
    });

    closeMobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });

    

    // Populate Saturday and Sunday dates
    function populateWeekendDates() {
        const today = new Date();
        bookingDateSelect.innerHTML = '<option value="">Select a Date</option>';

        for (let i = 0; i < 56; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            const dayOfWeek = date.getDay();
            if (dayOfWeek === 6 || dayOfWeek === 0) {
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = date.toLocaleDateString('en-US', options);
                const valueDate = date.toISOString().split('T')[0];

                const option = document.createElement('option');
                option.value = valueDate;
                option.textContent = formattedDate;
                bookingDateSelect.appendChild(option);
            }
        }
    }

    // Populate time slots
    function populateTimeSlots() {
        bookingTimeSelect.innerHTML = '<option value="">Select a Time</option>';
        const times = ['7:00 AM', '9:00 AM', '12:00 PM', '5:00 PM', '7:00 PM'];
        times.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            bookingTimeSelect.appendChild(option);
        });
    }

    // Booking form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('booking-name').value;
        const email = document.getElementById('booking-email').value;
        const classType = document.getElementById('class-type').value;
        const bookingDate = document.getElementById('booking-date').value;
        const bookingTime = document.getElementById('booking-time').value;

        if (!name || !email || !classType || !bookingDate || !bookingTime) {
            bookingMessageDiv.classList.remove('bg-green-100', 'text-green-800');
            bookingMessageDiv.classList.add('bg-red-100', 'text-red-800');
            bookingMessageDiv.textContent = 'Please fill in all fields to book your class.';
            bookingMessageDiv.classList.remove('hidden');
            return;
        }

        console.log('Booking Details:', {
            name,
            email,
            classType,
            bookingDate,
            bookingTime
        });

        bookingMessageDiv.classList.remove('bg-red-100', 'text-red-800');
        bookingMessageDiv.classList.add('bg-green-100', 'text-green-800');
        bookingMessageDiv.textContent = `Thank you, ${name}! Your ${classType} class on ${bookingDate} at ${bookingTime} has been booked. We look forward to seeing you!`;
        bookingMessageDiv.classList.remove('hidden');

        bookingForm.reset();
    });

    // Scroll-based header style changes
    const updateHeaderStyles = () => {
        if (window.scrollY > 50) {
            header.classList.add('bg-white', 'shadow-lg');
            header.classList.remove('bg-transparent');

            headerNavLinks.forEach(link => {
                link.classList.remove('text-gray-700', 'text-white');
                link.classList.add('text-gray-900');
            });
            mobileNavLinks.forEach(link => {
                link.classList.remove('text-gray-800', 'text-white');
                link.classList.add('text-gray-900');
            });

            // Change logo text to blue
            if (logoText) {
                logoText.classList.remove('text-white');
                logoText.classList.add('text-indigo-700');
            }

        } else {
            header.classList.remove('bg-white', 'shadow-lg');
            header.classList.add('bg-transparent');

            headerNavLinks.forEach(link => {
                link.classList.remove('text-gray-900', 'text-gray-700');
                link.classList.add('text-white');
            });
            mobileNavLinks.forEach(link => {
                link.classList.remove('text-gray-900', 'text-gray-800');
                link.classList.add('text-gray');
            });

            // Change logo text to white
            if (logoText) {
                logoText.classList.remove('text-indigo-700');
                logoText.classList.add('text-white');
            }
        }
        
    };

    window.addEventListener('scroll', updateHeaderStyles);
    updateHeaderStyles();

    populateWeekendDates();
    populateTimeSlots();
});
