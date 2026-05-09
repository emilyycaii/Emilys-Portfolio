// index.js

// 创建樱花雨效果的函数
function createSakuraRain() {
    // 获取页面主体
    const body = document.querySelector('body');

    // 创建樱花容器
    const sakuraContainer = document.createElement('div');
    sakuraContainer.classList.add('sakura-container');

    // 将樱花容器添加到页面主体
    body.appendChild(sakuraContainer);

    // 随机生成樱花飘落的数量
    const numberOfPetals = 15 + Math.floor(Math.random() * 10);

    // 创建樱花并添加到樱花容器中
    for (let i = 0; i < numberOfPetals; i++) {
        const sakura = document.createElement('div');

        const isCircle = Math.random() < 0.5;

        if (isCircle) {
            sakura.classList.add('circle');
        } else {
            sakura.classList.add('sakura');
        }

        // 随机生成樱花的初始位置、大小和动画延迟
        const startDelay = Math.random() * 10;
        const startX = Math.random() * window.innerWidth;
        const startY = -30;
        const size = 5 + Math.random() * 10;

        // 应用樱花的样式
        sakura.style.left = startX + 'px';
        sakura.style.top = startY + 'px';
        sakura.style.width = size + 'px';
        sakura.style.height = size + 'px';
        sakura.style.animationDelay = startDelay + 's';

        // 将樱花添加到容器中
        sakuraContainer.appendChild(sakura);
    }
}

function initTypingEffect() {
    const elements = document.querySelectorAll(".type-on-scroll");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeText(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));

    function typeText(el) {
        const paragraphs = Array.from(el.querySelectorAll("p"));

        paragraphs.forEach(p => {
            p.style.display = "none";
        });

        let paraIndex = 0;

        function typeNextParagraph() {
            if (paraIndex >= paragraphs.length) return;

            const p = paragraphs[paraIndex];
            const fullText = p.textContent.trim();
            p.style.display = "block";
            p.style.marginBottom = "0";
            p.textContent = "";

            let i = 0;
            function typing() {
                if (i <= fullText.length) {
                    p.textContent = fullText.slice(0, i);
                    i++;
                    setTimeout(typing, 15);
                } else {
                    if (paraIndex < paragraphs.length - 1) {
                        p.style.marginBottom = "1em";
                    }
                    paraIndex++;
                    typeNextParagraph();
                }
            }
            typing();
        }

        typeNextParagraph();
    }
}

function typing() {
    if (i <= fullText.length) {
        p.textContent = fullText.slice(0, i);
        i++;
        setTimeout(typing, 15);
    } else {
        if (paraIndex < paragraphs.length - 1) { // ← only add margin if not last paragraph
            p.style.marginBottom = "1em";
        }
        paraIndex++;
        typeNextParagraph();
    }
}

/*********************
* RESPONSIVE WARNING *
*********************/

const responsiveWarning = document.getElementById("responsive-warning");
// "true" if the site is optimized for responsive design, "false" if not.
const responsiveDesign = false;

// Show mobile warning if the user is on mobile and responsive-design is false.
if (!responsiveDesign && window.innerWidth <= 768) {
	responsiveWarning.classList.add("show");
}


/***********************
* MODE TOGGLE BEHAVIOR *
***********************/

window.addEventListener("DOMContentLoaded", () => {
    // 在页面加载完成后调用函数创建樱花雨效果
    createSakuraRain();
    initTypingEffect();
});
