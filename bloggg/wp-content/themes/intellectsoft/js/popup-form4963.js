if ($('#phone-number-popup').length) {
  const input = document.querySelector("#phone-number-popup");
  
  const country = document.querySelector("#country-popup");
  var iti2 = intlTelInput(input, {
      utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/8.4.6/js/utils.js",
  });
  country.value = iti2.getSelectedCountryData().name.replace(/\s*\(.*?\)\s*/g, '');
  input.addEventListener("countrychange", function () {
      country.value = itiEntry.getSelectedCountryData().name.replace(/\s*\(.*?\)\s*/g, '');
      validateInput(input, iti2);
    });
    input.addEventListener('input', function(e) {
      validateInput(input, iti2);
    });
}
function validateInput(input, itiEntry)
{
if (input.value.trim()) {
  if (itiEntry.isValidNumber()) {
    input.parentElement.parentElement.classList.remove("has-error");
    input.parentElement.classList.add("has-success");
    input.parentElement.setAttribute('style', "background-image: url(data:image/svg+xml,%3Csvg height='12' viewBox='0 0 16 12' width='16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m377.5 26.4765625 8.828125-8.828125 1.171875 1.171875-10 10-4.648438-4.6484375 1.171876-1.171875z' fill='%2326ad5f' fill-rule='evenodd' transform='translate(-372 -17)'/%3E%3C/svg%3E) !important");
    input.parentElement.removeAttribute('id');

  } else {
    input.parentElement.parentElement.classList.add("has-error");
    input.parentElement.classList.remove("has-success");
    input.parentElement.setAttribute('style', 'background-image: none !important');
    input.parentElement.setAttribute('id', 'phone-no-success');
  }
}
}
const isoft = 'isoft'
function isLocalStorageAvailable() {
    try {
      window.localStorage;
    } catch (err) {
      return false;
    }
    return true;
  }
function Notify(message = 'Default message', delay = 3000) {
    const existingNotify = document.querySelector('.notify')
    const wrapper = document.createElement('div')
    const textNode = document.createTextNode(message)
    const body = document.body
  
    if (existingNotify) body.removeChild(existingNotify)
  
    wrapper.classList.add('notify')
    wrapper.addEventListener('click', e => (e.target.style.opacity = 0))
    wrapper.appendChild(textNode)
  
    setTimeout(() => {
      wrapper.style.opacity = 1
      wrapper.style.transform = 'translateY(0)'
    }, 300)
  
    setTimeout(() => {
      wrapper.style.opacity = 0
      wrapper.style.transform = 'translateY(200%)'
    }, delay)
  
    return body.appendChild(wrapper)
  }
  
$.validator.methods.number = function (value, element) {
    return this.optional(element) || /^[0-9+\-() —]+$/.test(value)
}
$.validator.addMethod('filesize', function (value, element, param) {
    // param = size (in bytes)
    return this.optional(element) || element.files[0].size <= param
})
const hide = elem => elem ? elem.style.display = 'none' : null;
const show = elem => elem ? elem.style.display = 'block' : null;
const uploadErrorMessage = 'You can upload doc, docx, pdf, odt, ott, txt files under 25mb.';
const notifyDelay = 10000;
$('#form-contacts-popup').validate({
    errorClass: 'has-error',
    validClass: 'has-success',
    showErrors: function (errorMap, errorList) {
      if (errorMap['attach']) Notify(uploadErrorMessage, notifyDelay)
      this.defaultShowErrors()
    },
    highlight: function (elem, errorClass, validClass) {
      $(elem)
          .parent()
          .addClass(errorClass)
          .removeClass(validClass)
    },
    unhighlight: function (elem, errorClass, validClass) {
      $(elem)
          .parent()
          .removeClass(errorClass)
          .addClass(validClass)
    },
    rules: {
      name: {
        required: true,
        maxlength: 255
      },
      last_name: {
        required: true,
        maxlength: 255
      },
      phone: {
        required: false,
      },
      company: {
        required: false,
      },
      position: {
        required: true,
        maxlength: 255
      },
      country: {
        required: false
      },
      size: {
        required: true
      },
      interest: {
        required: false
      },
      email: {
        required: {
          depends: function () {
            $(this).val($.trim($(this).val()));
            return true;
          }
        },
        email: true,
        maxlength: 255
      },
      description: {
        required: true,
        maxlength: 65535
      },
      attach: {
        extension: 'doc|docx|pdf|odt|ott|txt',
        filesize: 25 * 1000 * 1000
      }
    },
    messages: {
      email: {
        email: 'Please enter a valid email address.'
      },
      attach: {
        filesize: 'File should be less than 25mb'
      }
    },
    submitHandler: function (form, event) {
      event.preventDefault()
  
      window.dataLayer.push({
          'event': 'click_button_send_pop_up_1',
          'blockTitle': 'experiment_6_pop_up_1',
          'topic': 'pop_up-form_1'
      });

      const fileInput = form.querySelector('#attach-popup');
      if (fileInput && fileInput.files.length === 0) {
        fileInput.remove();
      }
  
      // send ga event
      const options = {
        "Mobile App Development": "mob_app_dev_service",
        "Enterprise Software Development": "soft_dev_service",
        "Web Development": "web_dev_service",
        "Dedicated Teams": "ded_team_service",
        "IT Consulting": "it_cons_service",
        "Other": "other_service",
        "Internet of Things": "iot_solution",
        "Blockchain": "blockchain_solution",
        "Augmented Reality": "ar_solution",
        "Artificial Intelligence": "ai_solution",
        "Cloud Computing": "cloud_solution",
        "FinTech": "fintech_solution"
      };
      const selectedOption = $(form).find('.form__select').val();
      for (let key in options) {
        if (key === selectedOption) {
          ga('send', 'event', options[key], 'click', 'interested');
          break;
        }
      }
  
      const rowData = new FormData(form)
      const url = form.getAttribute('data-url')
      const contactErrorMessage = form.querySelector('.contact__error')
      const thxMessage = form.nextElementSibling
      const spinner = form.querySelector('.form-spinner')
      const submitButton = form.querySelector('.form__submit')
  
      rowData.append('handler_id', form.dataset.handler)
      if (spinner) spinner.classList.add('js-show')
  
      if (form.getAttribute('id') === 'form-contacts-popup') {
        hide(submitButton)
        if (isLocalStorageAvailable()) {
          localStorage.setItem(
              isoft,
              JSON.stringify({time: new Date().getTime()})
          )
        }
      }
  
      window.handleFormSubmit(url, rowData, {
        type: form.dataset.type
      })
          .then(res => {
            if (res.data.status) {
              hide(form)
              show(thxMessage)
              if ($("#pined-form-main-tokenization")[0]) {
                window.dataLayer.push({'event': 'RegisterFormSubmit'})
              }
            } else if (Object.keys(res.data).length >= 1) {
              Object.keys(res.data).map(error => {
                const inputName = error.split('-')[1]
                const inputElm = document.querySelector(`[name=${inputName}]`)
                const input = inputElm ? inputElm.parentElement : null
                if (input) {
                  input.classList.remove('has-success')
                  input.classList.add('has-error')
                }
              })
            } else {
              contactErrorMessage.textContent = 'Check selected fields, please.'
              show(contactErrorMessage)
            }
  
            if (spinner) spinner.classList.remove('js-show')
            show(submitButton)
          })
          .catch(error => {
            show(contactErrorMessage)
            show(submitButton)
            if (spinner) spinner.classList.remove('js-show')
            console.log(error)
          })
    }
  });
  $('.form--contact--rating').find('select').on('change', function () {
    this.options[this.selectedIndex].value
        ? this.style.color = '#323232'
        : this.style.color = 'rgb(132, 132, 132)'
  });
  
(function () {
    function isLocalStorageAvailable() {
        try {
          window.localStorage;
        } catch (err) {
          return false;
        }
        return true;
      }
    function openPopup() {
        if (window._growthbook.isOn("test-popup-form")) {
            console.log("Feature popup is enabled!")
        } else {
            console.log("Feature popup is disabled!")
        }

        const value = window._growthbook.getFeatureValue(
            "test-popup-form",
            "fallback"
        );
        console.log(value);
        if (value == 0) {
            console.log('dont show popup');
        } else {
        if ($(".ebook-popup").length) {
            if (sessionStorage.getItem("popupOpened") < 1 && !$(".ebook-popup").hasClass("active")) {
                $(".ebook-popup").addClass("active");
                $("body").addClass("disable-scroll");
                sessionStorage.setItem("popupOpened", 1 + Number(sessionStorage.getItem("popupOpened")));
            }
        } else {
            if ($(".contacts-popup").length) {
                if (sessionStorage.getItem("popupOpened") < 1 && !$(".contacts-popup").hasClass("active")) {
                    $(".contacts-popup").addClass("active");
                    $("body").addClass("disable-scroll");
                    sessionStorage.setItem("popupOpened", 1 + Number(sessionStorage.getItem("popupOpened")));
                }
            }
        }
    }
    }
    let timeSpent = 0;
    let tick = 7500;
    $(document).ready(function () {
        setInterval(timerIncrement, tick);
    });
    
    function timerIncrement() {
        timeSpent = timeSpent + 1;
        if (timeSpent > 3) {
        //openPopup();
        }
    }
    
    let idleInterval;
    window.addEventListener("focus", () => clearInterval(idleInterval));
    window.addEventListener("blur", countPopupDelay);

    function countPopupDelay() {

        let idleTime = 0;
        idleInterval = setInterval(timer, 10000);

        $(document).mousemove(function () {
            idleTime = 0;
            clearInterval(idleInterval);
        });
        $(document).keypress(function () {
            idleTime = 0;
            clearInterval(idleInterval);
        });

        function timer() {
            idleTime = idleTime + 1;
            if (idleTime > 2) {
            //openPopup();
            clearInterval(idleInterval);
            }
        }
    }

    $('a').on('mousedown', function() {
      const linkClickCount = Number(sessionStorage.getItem("linkClickCount"));
      if ($(this).attr('href') === '#') return;
      if (linkClickCount >= 3) {
        return;
      }
      sessionStorage.setItem(
          "linkClickCount",
          1 + linkClickCount
        );
      const linkClickCountUpdated = Number(sessionStorage.getItem("linkClickCount"));
      if (linkClickCountUpdated >= 2) {
        //setTimeout(() => openPopup(), 10000);
      }
    });
    $(document).ready(function () {
        if (Number(sessionStorage.getItem("linkClickCount")) >= 2) {
            //setTimeout(() => openPopup(), 10000);
        }
    });
    if ($(".contacts-popup").length) {
    $(".contacts-popup__close").on("click", function () {
        $(".contacts-popup").removeClass("active");
        $("body").removeClass("disable-scroll");
    });
    $('.contacts-popup').on('click', function(e) {
        if (e.target !== this) return;
        $(".contacts-popup").removeClass("active");
        $("body").removeClass("disable-scroll");
    })
    }

    if ($(".ebook-popup").length) {
        $(".ebook-popup__close").on("click", function () {
            $(".ebook-popup").removeClass("active");
            $("body").removeClass("disable-scroll");
        });
        $('.ebook-popup').on('click', function (e) {
            if (e.target !== this) return;
            $(".ebook-popup").removeClass("active");
            $("body").removeClass("disable-scroll");
        });
        $('.popup-button').on('click', function (e) {
            window.dataLayer.push({
                'event': 'click_button_download_now_pop_up_2',
                'blockTitle': 'experiment_6_pop_up_2',
                'topic': 'pop_up-form_2'
            });
        });
    }



    const ndaCheckbox = document.querySelector('#send_nda-popup');
    if (ndaCheckbox) {
        ndaCheckbox.addEventListener('click', e => {
            e.target.value === '1'
                ? (e.target.value = '0')
                : (e.target.value = '1')
        })
    }
    $("#form-wrap-popup form :input").focus(function() {
        $("label[for='" + this.id + "']").addClass("selected");
        }).blur(function() {
        $("label").removeClass("selected");
    });

    
    const clearStorage = document.querySelector('#clearStorage-popup')

    clearStorage &&
    clearStorage.addEventListener('click', e => {
    e.preventDefault()
    if (isLocalStorageAvailable()) {
        localStorage.clear()
    }
    location.reload()
    });

    const fileInput = document.querySelector('.form-contacts-popup input[type=file]')
    const clearAttach = document.querySelector('.form-contacts-popup .clear-attach')

    fileInput &&
    fileInput.addEventListener('change', e => {
      let fileName = e.target.value.split('\\').pop()
      const label = e.target.parentElement.querySelector('.upload__label')
      const maxLength = 15

      if (fileName.length >= maxLength) {
        fileName = `${fileName.slice(0, 5)}...${fileName.slice(-5)}`
      }

      fileName
          ? (label.querySelector('span').innerHTML = fileName)
          : (label.querySelector('span').innerHTML = e.target.dataset.label)

      clearAttach.style.display = 'block'
    })

    clearAttach && clearAttach.addEventListener('click', e => {
      e.preventDefault()
      fileInput.value = ''
      const defaultLabel = document.querySelector('.form-contacts-popup .uploaded__text')
      const uploadFile = document.querySelector('.form-contacts-popup .js-emptyFiles')
      defaultLabel.innerHTML = `<i class="isoi-paper-clip"></i>Attach file`
      clearAttach.style.display = 'none'
      uploadFile.classList.remove('has-error')
    })
})();

$(function () {
    var projects = [
      {
        label: "Afghanistan"
      },
      {
        label: "Albania"
      },
      {
        label: "Algeria"
      },
      {
        label: "American Samoa"
      },
      {
        label: "Andorra"
      },
      {
        label: "Angola"
      },
      {
        label: "Anguilla"
      },
      {
        label: "Antarctica"
      },
      {
        label: "Antigua and Barbuda"
      },
      {
        label: "Argentina"
      },
      {
        label: "Armenia"
      },
      {
        label: "Aruba"
      },
      {
        label: "Australia"
      },
      {
        label: "Austria"
      },
      {
        label: "Azerbaijan"
      },
      {
        label: "Bahamas"
      },
      {
        label: "Bahrain"
      },
      {
        label: "Bangladesh"
      },
      {
        label: "Barbados"
      },
      {
        label: "Belarus"
      },
      {
        label: "Belgium"
      },
      {
        label: "Belize"
      },
      {
        label: "Benin"
      },
      {
        label: "Bermuda"
      },
      {
        label: "Bhutan"
      },
      {
        label: "Bolivia"
      },
      {
        label: "Bosnia and Herzegovina"
      },
      {
        label: "Botswana"
      },
      {
        label: "Bouvet Island"
      },
      {
        label: "Brazil"
      },
      {
        label: "British Indian Ocean Territory"
      },
      {
        label: "Brunei"
      },
      {
        label: "Bulgaria"
      },
      {
        label: "Burkina Faso"
      },
      {
        label: "Burundi"
      },
      {
        label: "Cambodia"
      },
      {
        label: "Cameroon"
      },
      {
        label: "Canada"
      },
      {
        label: "Cape Verde"
      },
      {
        label: "Cayman Islands"
      },
      {
        label: "Central African Republic"
      },
      {
        label: "Chad"
      },
      {
        label: "Chile"
      },
      {
        label: "China"
      },
      {
        label: "Christmas Island"
      },
      {
        label: "Cocos (Keeling) Islands"
      },
      {
        label: "Colombia"
      },
      {
        label: "Comoros"
      },
      {
        label: "Congo"
      },
      {
        label: "The Democratic Republic of Congo"
      },
      {
        label: "Cook Islands"
      },
      {
        label: "Costa Rica"
      },
      {
        label: "Ivory Coast"
      },
      {
        label: "Croatia"
      },
      {
        label: "Cuba"
      },
      {
        label: "Cyprus"
      },
      {
        label: "Czech Republic"
      },
      {
        label: "Denmark"
      },
      {
        label: "Djibouti"
      },
      {
        label: "Dominica"
      },
      {
        label: "Dominican Republic"
      },
      {
        label: "East Timor"
      },
      {
        label: "Ecuador"
      },
      {
        label: "Egypt"
      },
      {
        label: "England"
      },
      {
        label: "El Salvador"
      },
      {
        label: "Equatorial Guinea"
      },
      {
        label: "Eritrea"
      },
      {
        label: "Estonia"
      },
      {
        label: "Ethiopia"
      },
      {
        label: "Falkland Islands"
      },
      {
        label: "Faroe Islands"
      },
      {
        label: "Fiji Islands"
      },
      {
        label: "Finland"
      },
      {
        label: "France"
      },
      {
        label: "French Guiana"
      },
      {
        label: "French Polynesia"
      },
      {
        label: "French Southern territories"
      },
      {
        label: "Gabon"
      },
      {
        label: "Gambia"
      },
      {
        label: "Georgia"
      },
      {
        label: "Germany"
      },
      {
        label: "Ghana"
      },
      {
        label: "Gibraltar"
      },
      {
        label: "Greece"
      },
      {
        label: "Greenland"
      },
      {
        label: "Grenada"
      },
      {
        label: "Guadeloupe"
      },
      {
        label: "Guam"
      },
      {
        label: "Guatemala"
      },
      {
        label: "Guernsey"
      },
      {
        label: "Guinea"
      },
      {
        label: "Guinea-Bissau"
      },
      {
        label: "Guyana"
      },
      {
        label: "Haiti"
      },
      {
        label: "Heard Island and McDonald Islands"
      },
      {
        label: "Holy See (Vatican City State)"
      },
      {
        label: "Honduras"
      },
      {
        label: "Hong Kong"
      },
      {
        label: "Hungary"
      },
      {
        label: "Iceland"
      },
      {
        label: "India"
      },
      {
        label: "Indonesia"
      },
      {
        label: "Iran"
      },
      {
        label: "Iraq"
      },
      {
        label: "Ireland"
      },
      {
        label: "Israel"
      },
      {
        label: "Isle of Man"
      },
      {
        label: "Italy"
      },
      {
        label: "Jamaica"
      },
      {
        label: "Japan"
      },
      {
        label: "Jersey"
      },
      {
        label: "Jordan"
      },
      {
        label: "Kazakhstan"
      },
      {
        label: "Kenya"
      },
      {
        label: "Kiribati"
      },
      {
        label: "Kuwait"
      },
      {
        label: "Kyrgyzstan"
      },
      {
        label: "Laos"
      },
      {
        label: "Latvia"
      },
      {
        label: "Lebanon"
      },
      {
        label: "Lesotho"
      },
      {
        label: "Liberia"
      },
      {
        label: "Libyan Arab Jamahiriya"
      },
      {
        label: "Liechtenstein"
      },
      {
        label: "Lithuania"
      },
      {
        label: "Luxembourg"
      },
      {
        label: "Macao"
      },
      {
        label: "North Macedonia"
      },
      {
        label: "Madagascar"
      },
      {
        label: "Malawi"
      },
      {
        label: "Malaysia"
      },
      {
        label: "Maldives"
      },
      {
        label: "Mali"
      },
      {
        label: "Malta"
      },
      {
        label: "Marshall Islands"
      },
      {
        label: "Martinique"
      },
      {
        label: "Mauritania"
      },
      {
        label: "Mauritius"
      },
      {
        label: "Mayotte"
      },
      {
        label: "Mexico"
      },
      {
        label: "Micronesia, Federated States of"
      },
      {
        label: "Moldova"
      },
      {
        label: "Monaco"
      },
      {
        label: "Mongolia"
      },
      {
        label: "Montserrat"
      },
      {
        label: "Montenegro"
      },
      {
        label: "Morocco"
      },
      {
        label: "Mozambique"
      },
      {
        label: "Myanmar"
      },
      {
        label: "Namibia"
      },
      {
        label: "Nauru"
      },
      {
        label: "Nepal"
      },
      {
        label: "Netherlands"
      },
      {
        label: "Netherlands Antilles"
      },
      {
        label: "New Caledonia"
      },
      {
        label: "New Zealand"
      },
      {
        label: "Nicaragua"
      },
      {
        label: "Niger"
      },
      {
        label: "Nigeria"
      },
      {
        label: "Niue"
      },
      {
        label: "Norfolk Island"
      },
      {
        label: "North Korea"
      },
      {
        label: "Northern Ireland"
      },
      {
        label: "Northern Mariana Islands"
      },
      {
        label: "Norway"
      },
      {
        label: "Oman"
      },
      {
        label: "Pakistan"
      },
      {
        label: "Palau"
      },
      {
        label: "Palestine"
      },
      {
        label: "Panama"
      },
      {
        label: "Papua New Guinea"
      },
      {
        label: "Paraguay"
      },
      {
        label: "Peru"
      },
      {
        label: "Philippines"
      },
      {
        label: "Pitcairn"
      },
      {
        label: "Poland"
      },
      {
        label: "Portugal"
      },
      {
        label: "Puerto Rico"
      },
      {
        label: "Qatar"
      },
      {
        label: "Reunion"
      },
      {
        label: "Romania"
      },
      {
        label: "Russian Federation"
      },
      {
        label: "Rwanda"
      },
      {
        label: "Saint Helena"
      },
      {
        label: "Saint Kitts and Nevis"
      },
      {
        label: "Saint Lucia"
      },
      {
        label: "Saint Pierre and Miquelon"
      },
      {
        label: "Saint Vincent and the Grenadines"
      },
      {
        label: "Samoa"
      },
      {
        label: "San Marino"
      },
      {
        label: "Sao Tome and Principe"
      },
      {
        label: "Saudi Arabia"
      },
      {
        label: "Scotland"
      },
      {
        label: "Senegal"
      },
      {
        label: "Serbia"
      },
      {
        label: "Seychelles"
      },
      {
        label: "Sierra Leone"
      },
      {
        label: "Singapore"
      },
      {
        label: "Slovakia"
      },
      {
        label: "Slovenia"
      },
      {
        label: "Solomon Islands"
      },
      {
        label: "Somalia"
      },
      {
        label: "South Africa"
      },
      {
        label: "South Georgia and the South Sandwich Islands"
      },
      {
        label: "South Korea"
      },
      {
        label: "South Sudan"
      },
      {
        label: "Spain"
      },
      {
        label: "SriLanka"
      },
      {
        label: "Sudan"
      },
      {
        label: "Suriname"
      },
      {
        label: "Svalbard and Jan Mayen"
      },
      {
        label: "Swaziland"
      },
      {
        label: "Sweden"
      },
      {
        label: "Switzerland"
      },
      {
        label: "Syria"
      },
      {
        label: "Tajikistan"
      },
      {
        label: "Tanzania"
      },
      {
        label: "Thailand"
      },
      {
        label: "Timor-Leste"
      },
      {
        label: "Togo"
      },
      {
        label: "Tokelau"
      },
      {
        label: "Tonga"
      },
      {
        label: "Trinidad and Tobago"
      },
      {
        label: "Tunisia"
      },
      {
        label: "Turkey"
      },
      {
        label: "Turkmenistan"
      },
      {
        label: "Turks and Caicos Islands"
      },
      {
        label: "Tuvalu"
      },
      {
        label: "Uganda"
      },
      {
        label: "Ukraine"
      },
      {
        label: "United Arab Emirates"
      },
      {
        label: "United Kingdom"
      },
      {
        label: "United States"
      },
      {
        label: "United States Minor Outlying Islands"
      },
      {
        label: "Uruguay"
      },
      {
        label: "Uzbekistan"
      },
      {
        label: "Vanuatu"
      },
      {
        label: "Venezuela"
      },
      {
        label: "Vietnam"
      },
      {
        label: "Virgin Islands, British"
      },
      {
        label: "Virgin Islands, U.S."
      },
      {
        label: "Wales"
      },
      {
        label: "Wallis and Futuna"
      },
      {
        label: "Western Sahara"
      },
      {
        label: "Yemen"
      },
      {
        label: "Zambia"
      },
      {
        label: "Zimbabwe"
      }
    ];
    if ($('#country-popup').length) {
  
      $("#country-popup").autocomplete({
        minLength: 0,
        source: projects,
        focus: function (event, ui) {
          $("#country-popup").val(ui.item.label);
          $(".ui-helper-hidden-accessible").hide();
          event.preventDefault();
          return false;
        },
        select: function (event, ui) {
          $("#country-popup").val(ui.item.label);
  
          return false;
        }
      })
          .autocomplete("instance")._renderItem = function (ul, item) {
        return $("<li>")
            .append("<div>" + item.label + "</div>")
            .appendTo(ul);
      };
    }
  
    $("#form-wrap form :input").focus(function() {
      $("label[for='" + this.id + "']").addClass("selected");
    }).blur(function() {
      $("label").removeClass("selected");
    });
  
  });