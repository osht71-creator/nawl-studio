// رقم واتساب المتجر (بدون + أو أصفار في البداية) — غيّره هنا وفي ملفات HTML
const WHATSAPP = "966558064627";

document.getElementById("year").textContent = new Date().getFullYear();
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// قائمة الجوال
const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector(".nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});

// الظهور التدريجي
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// إمالة ثلاثية الأبعاد تتبع المؤشر
document.querySelectorAll("[data-tilt]").forEach((el) => {
  el.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" || reduceMotion) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 9}deg) rotateY(${px * 9}deg) translateZ(0)`;
  });
  el.addEventListener("pointerleave", () => { el.style.transform = ""; });
});

// رسالة واتساب جاهزة لكل قطعة
document.querySelectorAll(".order").forEach((btn) => {
  const msg = `السلام عليكم، أرغب في طلب «${btn.dataset.product}» من نَوْل بسعر ${btn.dataset.price} ر.س. هل ما زالت متاحة؟`;
  btn.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
});

// تصفية القطع في صفحة المتجر
const filters = document.querySelectorAll(".filter");
filters.forEach((f) => {
  f.addEventListener("click", () => {
    filters.forEach((x) => x.classList.remove("active"));
    f.classList.add("active");
    const cat = f.dataset.filter;
    document.querySelectorAll(".shop").forEach((sec) => {
      const group = sec.querySelector(".group-title").dataset.group;
      sec.classList.toggle("hide", cat !== "all" && cat !== group);
    });
  });
});

// فتح التصفية مباشرة إن جاء الزائر من رابط #paintings أو #textiles
if (location.hash === "#paintings" || location.hash === "#textiles") {
  const want = location.hash === "#paintings" ? "painting" : "textile";
  const btn = document.querySelector(`.filter[data-filter="${want}"]`);
  if (btn) btn.click();
}
