(function($) {
  $.fn.shambaSlider = function(options) {
    let ss = new ShambaClass(this, options);
    ss.initShamba();
    return this;
  };
})(jQuery);

function ShambaClass(selectedObject, options) {
  this.shamba = selectedObject.children().children();
  this.current = 0;
  this.animationType = "";
  this.animationTime = "";
  this.animationAuto = false;
  this.initShamba = function() {
    this.animationType = options.animation;
    this.animationAuto = options.interval.auto;
    this.animationTime = options.interval.time;
    this.shamba.css("opacity", 0);
    this.shamba.eq(0).css("opacity", 1);
    // append
    this.appendspan();
    //registerbtn
    this.registerButton();
    // autofade
    this.appendSliderButton();
    //auto
    this.autoSliderInit();
  };
  this.autoSliderInit = function() {
    var _this = this;
    if (_this.animationAuto === true) {
      var ShambaInterval = setInterval(() => {
        if (_this.animationType === "fade") {
          _this.fadeNextBtn();
        } else {
          _this.slideNextBtn();
        }
      }, _this.animationTime);
    }
    this.shamba
      .find("img")
      .mouseover(function() {
        clearInterval(ShambaInterval);
      })
      .mouseout(function() {
        _this.autoSliderInit();
      });
    $("#ss-next-btn").mouseover(function() {
      clearInterval(ShambaInterval);
    });
  };

  this.appendspan = function() {
    selectedObject.append(
      `<span id="ss-next-btn"><i class="fa fa-chevron-right" aria-hidden="true"></i></span><span id="ss-pre-btn"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>`
    );
  };
  this.appendSliderButton = function() {
    let slidebtn = "ss-btn-";
    selectedObject.append(`<div id="ss-slide-btn"></div>`);
    let left = 30;
    this.shamba.each(function(e, i) {
      selectedObject
        .find("#ss-slide-btn")
        .append(
          `<button id="${slidebtn}${e}" style="left:${left}%" class="ss-btn"></button>`
        );
      left = left + 10;
    });
    this.appendSliderEventRegister();
  };
  this.appendSliderEventRegister = function() {
    var _this = this;
    $(".ss-btn").each((i, e) => {
      $(`#${e.id}`).on("click", function() {
        _this.slidebtn(i);
      });
    });
  };
  this.registerButton = function() {
    let _this = this;
    selectedObject.find("#ss-next-btn").on("click", function() {
      if (_this.animationType === "fade") {
        _this.fadeNextBtn();
      } else {
        _this.slideNextBtn();
      }
    });
    selectedObject.find("#ss-pre-btn").on("click", function() {
      if (_this.animationType === "fade") {
        _this.fadePreBtn();
      } else {
        _this.slidePreBtn();
      }
    });
  };

  this.fadeNextBtn = function() {
    let previous = this.shamba.eq(this.current);
    if (this.current == this.shamba.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }
    let currentobj = this.shamba.eq(this.current);

    previous.removeClass("fadeOut");
    currentobj.removeClass("fadeOut");
    previous.removeClass("fadeIn");
    currentobj.removeClass("fadeIn");

    previous.addClass("fadeOut");
    currentobj.addClass("fadeIn");
  };
  this.fadePreBtn = function() {
    let previous = this.shamba.eq(this.current);
    if (this.current == 0) {
      this.current = this.shamba.length - 1;
    } else {
      this.current--;
    }
    let currentobj = this.shamba.eq(this.current);
    previous.removeClass("fadeOut");
    currentobj.removeClass("fadeOut");
    previous.removeClass("fadeIn");
    currentobj.removeClass("fadeIn");

    previous.addClass("fadeOut");
    currentobj.addClass("fadeIn");
  };
  this.slideNextBtn = function() {
    let previous = this.shamba.eq(this.current);
    if (this.current == this.shamba.length - 1) {
      this.current = 0;
    } else {
      this.current++;
    }
    let currentobj = this.shamba.eq(this.current);
    this.removeSlidersClass(previous);
    this.removeSlidersClass(currentobj);

    previous.css("opacity", 1).addClass("slideOutLeft");
    currentobj.addClass("slideInRight");
  };
  this.slidePreBtn = function() {
    let previous = this.shamba.eq(this.current);
    if (this.current == 0) {
      this.current = this.shamba.length - 1;
    } else {
      this.current--;
    }
    let currentobj = this.shamba.eq(this.current);
    this.removeSlidersClass(previous);
    this.removeSlidersClass(currentobj);

    previous.css("opacity", 1).addClass("slideOutRight");
    currentobj.addClass("slideInLeft");
  };
  this.slidebtn = function(index) {
    var _this = this;
    this.shamba.each((i, e) => {
      if (index === i) {
        _this.removeSlidersClass(this.shamba.eq(i));
        if (_this.animationType == "fade") {
          this.shamba
            .eq(i)
            .css("opacity", 1)
            .addClass("fadeIn");
        } else {
          this.shamba
            .eq(i)
            .css("opacity", 1)
            .addClass("slideInRight");
        }
      } else {
        _this.removeSlidersClass(this.shamba.eq(i));
        if (_this.animationType == "fade") {
          this.shamba
            .eq(i)
            .css("opacity", 1)
            .addClass("fadeOut");
        } else {
          this.shamba
            .eq(i)
            .css("opacity", 1)
            .addClass("slideOutLeft");
        }
      }
    });
  };

  this.removeSlidersClass = function(element) {
    element.removeClass("slideOutLeft");
    element.removeClass("slideInRight");
    element.removeClass("slideInLeft");
    element.removeClass("slideOutRight");
    element.removeClass("fadeOut");
    element.removeClass("fadeIn");
  };
}
