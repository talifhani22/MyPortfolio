// Animate on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  });
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach((elem) => observer.observe(elem));
  
  // Follow the cursor;
  const cursor = document.getElementById("cursor");
  
  window.addEventListener("mousemove", (e) => {
    cursor.style.opacity = 1;
    cursor.style.top = `${e.pageY}px`;
    cursor.style.left = `${e.pageX}px`;
  });
  
  document.addEventListener("mouseout", () => {
    cursor.style.opacity = 0;
  });
  
  // Show and Hide nav bar;
  let lastScrollTop = 0;
  let navBar = document.querySelector("nav");
  
  window.addEventListener("scroll", (e) => {
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      navBar.style.top = "-8rem";
    } else {
      navBar.style.top = "0";
    }
    lastScrollTop = scrollTop;
  });
  
  /*=== Projects ===*/
  const project_container = document.querySelector("#carousel-wrapper");
  const demo_container = document.querySelector("#demo-code");
  const prev = document.querySelector("#previous-option");
  const next = document.querySelector("#next-option");
  const project_title = document.querySelector("#current-option-title");
  const project_text = document.querySelector("#current-option-text");
  let project_img = document.querySelector("#image");
  const demo_link = document.querySelector("#demo");
  const code_link = document.querySelector("#code");
  
  // Show/Hide "demo" & "code" buttons;
  project_container.addEventListener("click", () => {
    demo_container.classList.toggle("open");
  });
  
  // Let's work with work section
  // First we need at least three projects;
  // Each project should have
  /*
  - Title;
  - Text;
  - 2 links:
    * Demo link
    * Code link
  */
  
  let project_titles = ["Project 1", "Project 2", "Project 3"];
  let project_texts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec risus convallis.\n Vestibulum in fermentum ante. Cras dolor ligula, dapibus nec tellus ut, dapibus vestibulum nisi. Sed tincidunt justo nec elit fermentum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec risus convallis, fermentum felis quis.\n Vestibulum in fermentum ante. Cras dolor ligula, dapibus nec tellus ut, dapibus vestibulum nisi. Sed tincidunt justo nec elit fermentum.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec risus convallis, fermentum felis quis.\n Vestibulum in fermentum ante. Cras dolor ligula, dapibus nec tellus ut."
  ];
  let img_srcs = [
    "https://images.unsplash.com/photo-1495615080073-6b89c9839ce0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=606&q=80",
    "https://images.unsplash.com/photo-1597589827317-4c6d6e0a90bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    "https://images.unsplash.com/photo-1504600770771-fb03a6961d33?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=582&q=80"
  ];
  let demo_links = ["#", "#", "#"];
  let code_links = ["#", "#", "#"];
  let index = 0;
  /*
    When we click on prev button, the following actions take place:
    1- the title change the -1 if index > 0 / title.length if index = 0;
    2- the text change the same way;
    3- the img source also;
    3- the demo link too;
    4- the code link too;
  */
  // Change text;
  function changeText(element, text) {
    element.innerText = text;
  }
  
  // Change Attribute;
  function changeAttribute(element, attr, text) {
    element.setAttribute(attr, text);
  }
  // Our main function;
  function changeProject(indexChange) {
    index += indexChange;
    if (index < 0) {
      index = project_titles.length - 1;
    } else if (index >= project_titles.length) {
      index = 0;
    }
    changeText(project_title, project_titles[index]);
    changeText(project_text, project_texts[index]);
    changeAttribute(project_img, "src", img_srcs[index]);
    changeAttribute(demo_link, "href", demo_links[index]);
    changeAttribute(code_link, "href", code_links[index]);
  }
  
  // Changing project whenever clickea on next/prev or swiping left/right;
  prev.addEventListener("click", (e) => {
    e.stopPropagation();
    animatePrev();
    setTimeout(function () {
      changeProject(-1);
    }, 200);
  });
  next.addEventListener("click", (e) => {
    e.stopPropagation();
    animateNext();
    setTimeout(function () {
      changeProject(1);
    }, 200);
  });
  
  // Animate when project changes to previous one;
  function animatePrev() {
    project_title.style.animation = "prevAnimation 1s ease-out";
    project_text.style.animation = "prevAnimation 1s ease-out";
    project_img.style.animation = "prevAnimation .75s ease-out";
    setTimeout(function () {
      project_title.style.animation = "";
      project_text.style.animation = "";
      project_img.style.animation = "";
    }, 1000);
  }
  
  // Animate when project changes to next one;
  function animateNext() {
    project_title.style.animation = "nextAnimation 1s ease-out";
    project_text.style.animation = "nextAnimation 1s ease-out";
    project_img.style.animation = "nextAnimation .75s ease-out";
    setTimeout(function () {
      project_title.style.animation = "";
      project_text.style.animation = "";
      project_img.style.animation = "";
    }, 1000);
  }
  
  /** === Bonuses === **/
  // Adding some swiping;
  let x1 = 0;
  let y1 = 0;
  project_container.addEventListener("touchstart", function (e) {
    x1 = e.changedTouches[0].screenX;
    y1 = e.changedTouches[0].pageY;
  });
  
  project_container.addEventListener("touchend", function (e) {
    let x2 = e.changedTouches[0].screenX;
    let y2 = e.changedTouches[0].pageY;
  
    if (x1 - x2 > 50 && Math.abs(y1 - y2) < 30) {
      animateNext();
      setTimeout(function () {
        changeProject(1);
      }, 200);
    } else if (x1 - x2 < -50 && Math.abs(y1 - y2) < 30) {
      animatePrev();
      setTimeout(function () {
        changeProject(-1);
      }, 200);
    }
  });
  
  /* ======== Contact Form ======== */
  let input_areas = document.querySelectorAll("input");
  let form = document.getElementById("form");
  let textarea = document.getElementById("message");
  
  // Prevent default of behavior;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    for (let i = 0; i < input_areas.length - 1; i++) {
      input_areas[i].value = "";
      textarea.value = "";
      let label = input_areas[i].previousElementSibling;
      label.classList.remove("onfocus");
    }
  });
  
  // slide the input labels;
  for (let i = 0; i < input_areas.length; i++) {
    onFocus(input_areas[i]);
    onBlur(input_areas[i]);
  }
  // input_areas.forEach((area) => {
  
  // });
  
  function onFocus(elem) {
    /*
      when the focus starts  we want add the class "onfocus" to the label;
    */
    elem.addEventListener("focus", () => {
      let label = elem.previousElementSibling;
      label.classList.add("onfocus");
    });
  }
  function onBlur(elem) {
    /*
      when the focus ends  we want remove the class "onfocus" from the label;
    */
    elem.addEventListener("blur", () => {
      if (elem.value == "") {
        let label = elem.previousElementSibling;
        label.classList.remove("onfocus");
      }
    });
  }
  