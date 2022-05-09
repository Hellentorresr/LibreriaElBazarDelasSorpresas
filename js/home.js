 let slideIndex = 0;
 let slideIndex2 = 1;

 showSlidesAuto();

 function showSlidesAuto() {
     let i;
     let slides = document.getElementsByClassName("mySlides");
     for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
     }
     slideIndex++;
     if (slideIndex > slides.length) { slideIndex = 1 }
     slides[slideIndex - 1].style.display = "flex";
     setTimeout(showSlidesAuto, 5000); // Change image every 5 seconds
 }


 showSlides(slideIndex2);

 // Next/previous controls
 function plusSlides(n) {
     showSlides(slideIndex2 += n);
 }

 // Thumbnail image controls
 function currentSlide(n) {
     showSlides(slideIndex2 = n);
 }

 function showSlides(n) {
     let i;
     let slides = document.getElementsByClassName("mySlides");
/*      let dots = document.getElementsByClassName("dot"); */
     if (n > slides.length) { slideIndex2 = 1 }
     if (n < 1) { slideIndex2 = slides.length }
     for (i = 0; i < slides.length; i++) {
         slides[i].style.display = "none";
     }
     /* for (i = 0; i < dots.length; i++) {
         dots[i].className = dots[i].className.replace(" active", "");
     } */
     slides[slideIndex2 - 1].style.display = "flex";
    /*  dots[slideIndex2 - 1].className += " active"; */
 }