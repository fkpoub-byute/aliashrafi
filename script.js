const header = document.getElementById("siteHeader");

window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 20);
});


const toggle = document.getElementById("menuToggle");
const nav = document.getElementById("mainNav");

toggle.addEventListener("click", () => {
    nav.classList.toggle("active");
});


const skills = document.querySelectorAll(".skill");

if (window.innerWidth > 768) {
    skills.forEach((skill, index) => {
        let direction = index % 2 === 0 ? 1 : -1;
        let offset = 0;

        function animate() {
            offset += 0.015;
            skill.style.transform = `translateY(${Math.sin(offset) * 6 * direction}px)`;
            requestAnimationFrame(animate);
        }

        animate();
    });
}
const projects = document.querySelectorAll(".project-card")

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("show")

        }

    })

}, {
    threshold: 0.3
})

projects.forEach(project => {
    observer.observe(project)
})
const text = "کدنویس"
const typed = document.getElementById("typed")
const line3 = document.querySelector(".line3")
const message = document.querySelector(".ai-message")

let i = 0

function type() {

    if (i < text.length) {

        typed.innerHTML += text.charAt(i)
        i++
        setTimeout(type, 120)

    } else {

        setTimeout(() => {

            typed.style.textDecoration = "line-through"
            typed.style.opacity = "0.4"

            line3.classList.add("show")

            setTimeout(() => {
                message.classList.add("show")
            }, 600)

        }, 700)

    }

}

setTimeout(type, 800)
const magneticBtn = document.querySelector(".magnetic")

magneticBtn.addEventListener("mousemove", (e) => {

    const rect = magneticBtn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    magneticBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`

})

magneticBtn.addEventListener("mouseleave", () => {
    magneticBtn.style.transform = "translate(0,0)"
})
document.addEventListener("DOMContentLoaded", function () {

    const resumeBtn = document.getElementById("resumeBtn");
    const resumeToast = document.getElementById("resumeToast");

    if (!resumeBtn || !resumeToast) return;

    resumeBtn.addEventListener("click", function (e) {
        e.preventDefault();

        resumeToast.classList.add("show");

        setTimeout(() => {
            resumeToast.classList.remove("show");
        }, 2200);
    });

});
const statusWidget = document.getElementById("statusWidget");
const statusClose = document.getElementById("statusClose");
const statusToggle = document.getElementById("statusToggle");

if (statusWidget && statusClose && statusToggle) {

    statusClose.addEventListener("click", () => {

        statusWidget.classList.add("hidden");
        statusToggle.style.display = "block";

    });

    statusToggle.addEventListener("click", () => {

        statusWidget.classList.remove("hidden");
        statusToggle.style.display = "none";

    });

}
document.addEventListener("DOMContentLoaded", () => {

    const backToTopBtn = document.getElementById("backToTop");

    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });
    }

});
const scrollIndicatorFill = document.querySelector(".scroll-indicator-fill");

if (scrollIndicatorFill) {
    let scrollTimeout;

    const updateScrollIndicator = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        scrollIndicatorFill.style.width = `${progress}%`;

        if (progress <= 0.5) {
            scrollIndicatorFill.classList.add("is-start");
        } else {
            scrollIndicatorFill.classList.remove("is-start");
        }

        scrollIndicatorFill.classList.add("is-scrolling");

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            scrollIndicatorFill.classList.remove("is-scrolling");
        }, 140);
    };

    updateScrollIndicator();
    window.addEventListener("scroll", updateScrollIndicator, { passive: true });
    window.addEventListener("resize", updateScrollIndicator);
}

document.addEventListener("DOMContentLoaded", () => {
    const skillChips = document.querySelectorAll(".skill-chip");
    const isTouchDevice =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    skillChips.forEach((chip) => {
        const level = chip.dataset.level || "0";
        const name = chip.querySelector("span")?.textContent?.trim() || "Skill";

        chip.setAttribute("tabindex", "0");
        chip.setAttribute("role", "button");
        chip.setAttribute("aria-label", `${name} - ${level} percent`);
        chip.setAttribute("aria-expanded", "false");

        const tooltip = document.createElement("div");
        tooltip.className = "skill-chip-tooltip";
        tooltip.innerHTML = `
            <div class="skill-tooltip-top">
                <span class="skill-tooltip-name">${name}</span>
                <span class="skill-tooltip-level">${level}%</span>
            </div>
            <div class="skill-tooltip-track">
                <div class="skill-tooltip-fill"></div>
            </div>
            <div class="skill-tooltip-caption">سطح تسلط تقریبی من روی این مهارت</div>
        `;

        chip.appendChild(tooltip);

        const fill = tooltip.querySelector(".skill-tooltip-fill");

        const openTooltip = () => {
            chip.classList.add("is-active");
            chip.setAttribute("aria-expanded", "true");

            requestAnimationFrame(() => {
                fill.style.width = `${level}%`;
            });
        };

        const closeTooltip = () => {
            chip.classList.remove("is-active");
            chip.setAttribute("aria-expanded", "false");
            fill.style.width = "0%";
        };

        if (!isTouchDevice) {
            chip.addEventListener("mouseenter", openTooltip);
            chip.addEventListener("mouseleave", closeTooltip);
            chip.addEventListener("focus", openTooltip);
            chip.addEventListener("blur", closeTooltip);
        }

        chip.addEventListener("click", (e) => {
            if (!isTouchDevice) return;

            const wasActive = chip.classList.contains("is-active");

            skillChips.forEach((item) => {
                item.classList.remove("is-active");
                item.setAttribute("aria-expanded", "false");
                const itemFill = item.querySelector(".skill-tooltip-fill");
                if (itemFill) itemFill.style.width = "0%";
            });

            if (!wasActive) {
                openTooltip();
            }
        });
    });

    document.addEventListener("click", (e) => {
        const activeChip = e.target.closest(".skill-chip");
        if (activeChip) return;

        document.querySelectorAll(".skill-chip").forEach((chip) => {
            chip.classList.remove("is-active");
            chip.setAttribute("aria-expanded", "false");

            const fill = chip.querySelector(".skill-tooltip-fill");
            if (fill) fill.style.width = "0%";
        });
    });
});

const consoleStyle = 'background: #1b1613; color: #b56a3b; border: 1px solid #b56a3b; padding: 10px 20px; border-radius: 5px; font-weight: bold; font-size: 14px;';
console.log("%cسلام به توی کنجکاو و کمی فضول! 👋 خوشحالم که داری کدها رو می‌بینی. اگه دنبال همکاری هستی، خوشحال می‌شم با هم گپ بزنیم.", consoleStyle);

let idleTimer;
const showIdleMessage = () => {
    const msg = document.createElement('div');
    msg.className = 'idle-notification';
    msg.innerHTML = 'هنوز اینجایی؟ عمیق غرق شدیا! 😉';
    document.body.appendChild(msg);
    setTimeout(() => msg.classList.add('show'), 100);
    setTimeout(() => {
        msg.classList.remove('show');
        setTimeout(() => msg.remove(), 500);
    }, 4000);
};

const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(showIdleMessage, 20000);
};

['mousemove', 'touchstart', 'keydown', 'scroll'].forEach(evt =>
    window.addEventListener(evt, resetIdleTimer)
);

const ctaBtn = document.querySelector(".cta-btn.magnetic");

if (ctaBtn) {

    const originalText = "شروع پروژه";

    const playfulTexts = [
        "بریم برای خلق یه دنیای جدید؟ ✨",
        "ایده‌ات رو بهم بگو 💡",
        "زیر موشک بارون هم کار میکنم 🚀",
        "توی نت ملی هم همراهتم 😉",
        "یه پروژه خفن بسازیم ؟🚀",
        "بیا اینترنت رو قشنگ‌ تر کنیم 🎨",
    ];

    let lastIndex = -1;

    function getRandomText() {
        let index;
        do {
            index = Math.floor(Math.random() * playfulTexts.length);
        } while (index === lastIndex);

        lastIndex = index;
        return playfulTexts[index];
    }

    function changeText() {
        const newText = getRandomText();

        ctaBtn.style.transition = "opacity 0.25s ease";
        ctaBtn.style.opacity = "0.6";

        setTimeout(() => {
            ctaBtn.textContent = newText;
            ctaBtn.style.opacity = "1";
        }, 150);
    }

    function resetText() {
        ctaBtn.textContent = originalText;
    }

    ctaBtn.addEventListener("mouseenter", changeText);
    ctaBtn.addEventListener("mouseleave", resetText);

    ctaBtn.addEventListener("touchstart", changeText);
}
