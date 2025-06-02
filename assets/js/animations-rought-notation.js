// animations-rough-notation.js

window.addEventListener("DOMContentLoaded", () => {

    // === Animation UNDERLINE ===
    const underlineElements = document.querySelectorAll('.animation-underline');
    const underlineAnnotations = [];

    function createUnderlineAnnotation(element) {
        const isDark = document.body.classList.contains('dark-mode');
        const color = isDark ? '#f1e9e9' : '#000000';
        return RoughNotation.annotate(element, {
            type: 'underline',
            color: color,
            animate: true,
            animationDuration: 1000,
        });
    }

    underlineElements.forEach(element => {
        const annotation = createUnderlineAnnotation(element);
        annotation.show();
        underlineAnnotations.push({ element, annotation });
    });

    function refreshUnderlineAnnotations() {
        underlineAnnotations.forEach(item => {
            item.annotation.hide();
            item.annotation = createUnderlineAnnotation(item.element);
            item.annotation.show();
        });
    }


    // === Animation CIRCLE (nav bouton par exemple) ===
    const circleElements = document.querySelectorAll('.animation-circle');
    const circleAnnotations = [];

    function createCircleAnnotation(element) {
        const isDark = document.body.classList.contains('dark-mode');
        const color = isDark ? '#f1e9e9' : '#000000';
        return RoughNotation.annotate(element, {
            type: 'circle',
            color: color,
            animate: true,
            animationDuration: 800,
        });
    }

    circleElements.forEach(element => {
        const annotation = createCircleAnnotation(element);
        annotation.show();
        circleAnnotations.push({ element, annotation });

        element.addEventListener('mouseenter', () => {
            annotation.hide();
            setTimeout(() => {
                annotation.show();
            }, 50);
        });
    });

    function refreshCircleAnnotations() {
        circleAnnotations.forEach(item => {
            item.annotation.hide();
            item.annotation = createCircleAnnotation(item.element);
            item.annotation.show();
        });
    }

    // === Animation HIGHLIGHT ===
    const highlightElements = document.querySelectorAll('.animation-highlight');
    const highlightAnnotations = [];

    function createHighlightAnnotation(element) {
        return RoughNotation.annotate(element, {
            type: 'highlight',
            color: '#f1e9e9', // reste rose dans tous les modes
            animate: true,
            animationDuration: 1000,
            padding: 5,
        });
    }

    highlightElements.forEach(element => {
        const annotation = createHighlightAnnotation(element);
        annotation.show();
        highlightAnnotations.push({ element, annotation });
    });

    function refreshHighlightAnnotations() {
        highlightAnnotations.forEach(item => {
            item.annotation.hide();
            item.annotation = createHighlightAnnotation(item.element);
            item.annotation.show();
        });
    }

    // === Gestion du changement de thème ===
    const toggleBtn = document.getElementById('button-theme');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            setTimeout(() => {
                refreshUnderlineAnnotations();
                refreshCircleAnnotations();
                refreshHighlightAnnotations();
            }, 300);
        });
    }

});
