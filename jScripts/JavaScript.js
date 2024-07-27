function summery() {
    var userdestination = document.getElementById("flightbox").value;
    var season = "";
    var winterRadio = document.getElementById("winter");
    var summerRadio = document.getElementById("summer");

    if (winterRadio.checked) {
        season = winterRadio.value;
    } else if (summerRadio.checked) {
        season = summerRadio.value;
    }

    // יצירת סיכום היעד והעונה
    var summaryText = "For a flight to <span class='underline'>" + userdestination + "</span> in the <span class='underline'>" + season + "</span> you need to take:";

    // איסוף הצ'ק בוקסים המסומנים
    var checkedItems = [];
    if (season === 'summer') {
        document.querySelectorAll('#summertodolist input[type="checkbox"]:checked').forEach(cb => {
            checkedItems.push(cb.nextSibling.nodeValue.trim());
        });
    } else if (season === 'winter') {
        document.querySelectorAll('#wintertodolist input[type="checkbox"]:checked').forEach(cb => {
            checkedItems.push(cb.nextSibling.nodeValue.trim());
        });
    }

    // הוספת רשימת הפריטים המסומנים לטקסט הסיכום
    if (checkedItems.length > 0) {
        summaryText += "<ul>";
        checkedItems.forEach(item => {
            summaryText += "<li>" + item + "</li>";
        });
        summaryText += "</ul>";
    } else {
        summaryText += " No items selected.";
    }

    // עדכון ה-#sumdetails
    document.getElementById("sumdetails").innerHTML = summaryText;

    // עדכון ה-#chekbox עם התוכן של הצ'ק בוקסים המסומנים
    var checkboxText = "<ul>";
    checkedItems.forEach(item => {
        checkboxText += "<li>" + item + "</li>";
    });
    checkboxText += "</ul>";
    document.getElementById("chekbox").innerHTML = checkboxText;
}

// פונקציה לעדכון השקיפות של פריטי קיץ או חורף בהתאם לעונה
function updateSeasonDisplay() {
    var summerRadio = document.getElementById('summer');
    var winterRadio = document.getElementById('winter');

    var showH2 = document.getElementById('showh2');
    var showButton = document.getElementById('mybagbutton');
    var summerToDoList = document.getElementById('summertodolist');
    var winterToDoList = document.getElementById('wintertodolist');

    if (summerRadio.checked) {
        // אם נבחר קיץ
        showH2.style.opacity = '1';
        showButton.style.opacity = '1';
        summerToDoList.style.opacity = '1';
        winterToDoList.style.opacity = '0'; // השקיפות של פריטי חורף פחותה

        // עדכון השקיפות של פריטי קיץ
        document.querySelectorAll('.summer-image').forEach(img => {
            img.style.opacity = 0.5;
        });

        // אם התמונה מופיעה גם בחורף, השאר אותה חצי שקופה
        document.querySelectorAll('.winter-image').forEach(img => {
            if (img.classList.contains('summer-image')) {
                img.style.opacity = 0.5;
            } else {
                img.style.opacity = 0;
            }
        });
    } else if (winterRadio.checked) {
        // אם נבחר חורף
        showH2.style.opacity = '1';
        showButton.style.opacity = '1';
        winterToDoList.style.opacity = '1';
        winterToDoList.style.display = 'inline-block'; // הצג את פריטי החורף
        summerToDoList.style.opacity = '0'; // השקיפות של פריטי קיץ פחותה

        // עדכון השקיפות של פריטי חורף
        document.querySelectorAll('.winter-image').forEach(img => {
            img.style.opacity = 0.5;
        });

        // אם התמונה מופיעה גם בקיץ, השאר אותה חצי שקופה
        document.querySelectorAll('.summer-image').forEach(img => {
            if (img.classList.contains('winter-image')) {
                img.style.opacity = 0.5;
            } else {
                img.style.opacity = 0;
            }
        });
    }
}

// פונקציה לעדכון השקיפות של פריטי קיץ וחורף
function updateAllItems(summerOpacity, winterOpacity) {
    // עדכון השקיפות של פריטי קיץ
    document.querySelectorAll('.summer-image').forEach(img => {
        img.style.opacity = summerOpacity;
    });

    // עדכון השקיפות של פריטי חורף
    document.querySelectorAll('.winter-image').forEach(img => {
        img.style.opacity = winterOpacity;
    });
}

// פונקציה לעדכון הצ'ק בוקס בהתאם לעונה הנוכחית
function updateItem(imageId, checkbox) {
    if (currentSeason === 'summer') {
        updateSummerItem(imageId, checkbox);
    } else if (currentSeason === 'winter') {
        updateWinterItem(imageId, checkbox);
    }
}

// פונקציה לעדכון צ'ק בוקסים ותמונות עבור קיץ
function updateSummerItem(imageId, checkbox) {
    var image = document.getElementById(imageId);
    image.style.opacity = checkbox.checked ? 1 : 0.5;
}

// פונקציה לעדכון צ'ק בוקסים ותמונות עבור חורף
function updateWinterItem(imageId, checkbox) {
    var image = document.getElementById(imageId);
    image.style.opacity = checkbox.checked ? 1 : 0.5;
}

// משתנים לשמירת מצב עונה נוכחית
var currentSeason = '';  // ברירת מחדל

// פונקציה שמעדכנת את מצב העונה
function setSeason(season) {
    currentSeason = season;
    updateAllItems(season === 'summer' ? 0.5 : 0, season === 'winter' ? 0.5 : 0);
}

// התחלת פונקציה לטעינת עונה ברירת מחדל
setSeason(currentSeason);

function updateCheckboxes(season) {
    // מחפש את כל הצ'ק בוקסים של קיץ וחורף
    const summerCheckboxes = document.querySelectorAll('#summerToDoList input[type="checkbox"]');
    const winterCheckboxes = document.querySelectorAll('#winterToDoList input[type="checkbox"]');

    if (season === 'summer') {
        // מוודא שרשימת הקיץ מוצגת ורשימת החורף מוסתרת
        document.getElementById('summerToDoList').style.display = 'block';
        document.getElementById('winterToDoList').style.display = 'none';

        // מסיר את הבחירה מכל צ'ק בוקס בקיץ
        summerCheckboxes.forEach(cb => cb.checked = false);

        // מבטל את הבחירה בכל צ'ק בוקס של חורף
        winterCheckboxes.forEach(cb => cb.checked = false);
    } else if (season === 'winter') {
        // מוודא שרשימת החורף מוצגת ורשימת הקיץ מוסתרת
        document.getElementById('winterToDoList').style.display = 'block';
        document.getElementById('summerToDoList').style.display = 'none';

        // מסיר את הבחירה מכל צ'ק בוקס בחורף
        winterCheckboxes.forEach(cb => cb.checked = false);

        // מבטל את הבחירה בכל צ'ק בוקס של קיץ
        summerCheckboxes.forEach(cb => cb.checked = false);
    }
}
