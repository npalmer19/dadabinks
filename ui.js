// Select DOM elements to work with
const authenticatedNav = document.getElementById('authenticated-nav');
const accountNav = document.getElementById('account-nav');
const mainContainer = document.getElementById('main-container');

//my globles
var next = document.createElement('button');
var back = document.createElement('button');

var add = document.createElement('button');

var search = document.createElement('button');
search.id = 'search';

var searchfolder = document.createElement('input');
searchfolder.id = "foldername";
searchfolder.type = "text";

var ReadytoSend = document.createElement('button');

var counter = 1;


var receivers = [
   ['Nick Palmer', 'npalmer19@outlook.com'],
];

const Views = { error: 1, home: 2, calendar: 3 };

function createElement(type, className, text) {

  var element = document.createElement(type);
  element.className = className;

  if (text) {
    var textNode = document.createTextNode(text);
    element.appendChild(textNode);
  }

  return element;
}

function showAuthenticatedNav(account, view) {
  authenticatedNav.innerHTML = '';


  if (account) {
    // Add Calendar link
    var calendarNav = createElement('li', 'nav-item');

    var calendarLink = createElement('button', `btn btn-link nav-link${view === Views.calendar ? ' active' : '' }`, 'Inbox');
    calendarLink.setAttribute('onclick', 'getEvents(); reset();');
    calendarLink.id = "nav-item";
    calendarNav.appendChild(calendarLink);

    authenticatedNav.appendChild(calendarNav);
  }
}

function showAccountNav(account) {
  accountNav.innerHTML = '';

  if (account) {

    // Show the "signed-in" nav

    accountNav.className = 'nav-item dropdown';

    var dropdown = createElement('a', 'nav-link dropdown-toggle');
    dropdown.setAttribute('data-toggle', 'dropdown');
    dropdown.setAttribute('role', 'button');
    accountNav.appendChild(dropdown);

    var userIcon = createElement('i',
      'far fa-user-circle fa-lg rounded-circle align-self-center');
    userIcon.style.width = '32px';
    dropdown.appendChild(userIcon);

    var menu = createElement('div', 'dropdown-menu dropdown-menu-right');
    dropdown.appendChild(menu);

    var userName = createElement('p', 'dropdown-item-text mb-0', account.name);
    menu.appendChild(userName);

    var userEmail = createElement('p', 'dropdown-item-text text-muted mb-0', account.userName);
    menu.appendChild(userEmail);

    var divider = createElement('div', 'dropdown-divider');
    menu.appendChild(divider);

    var signOutButton = createElement('p', 'dropdown-item', 'Sign out');
    signOutButton.setAttribute('onclick', 'signOut();');
    menu.appendChild(signOutButton);
  } else {
    // Show a "sign in" button
    accountNav.className = 'nav-item';

    var signInButton = createElement('button', 'btn btn-link nav-link', 'Sign in');
    signInButton.setAttribute('onclick', 'signIn();');
    accountNav.appendChild(signInButton);
  }
}

function showWelcomeMessage(account) {
  // Create jumbotron
  var jumbotron = createElement('div', 'jumbotron');

  var heading = createElement('h1', null, 'Data Dog Email Manager');
  jumbotron.appendChild(heading);

/*  var lead = createElement('p', 'lead',
    'This sample app shows how to use the Microsoft Graph API to access' +
    ' a user\'s data from JavaScript.');
  jumbotron.appendChild(lead);*/

  if (account) {
/*    // Welcome the user by name
    var welcomeMessage = createElement('h4', null, `Welcome ${account.name}!`);
    jumbotron.appendChild(welcomeMessage);

    var callToAction = createElement('p', null,
      'Use the navigation bar at the top of the page to get started.');
    jumbotron.appendChild(callToAction);*/
  } else {
    // Show a sign in button in the jumbotron
    var signInButton = createElement('button', 'btn btn-primary btn-large', 'Click here to sign in');
    signInButton.setAttribute('onclick', 'signIn();')
    jumbotron.appendChild(signInButton);
  }

  mainContainer.innerHTML = '';
  mainContainer.appendChild(jumbotron);
}

function showError(error) {
  var alert = createElement('div', 'alert alert-danger');

  var message = createElement('p', 'mb-3', error.message);
  alert.appendChild(message);

  if (error.debug)
  {
    var pre = createElement('pre', 'alert-pre border bg-light p-2');
    alert.appendChild(pre);

    var code = createElement('code', 'text-break text-wrap',
      JSON.stringify(error.debug, null, 2));
    pre.appendChild(code);
  }

  mainContainer.innerHTML = '';
  mainContainer.appendChild(alert);
}

function updatePage(account, view, data) {
  if (!view || !account) {
    view = Views.home;
  }

  showAccountNav(account);
  showAuthenticatedNav(account, view);

  switch (view) {
    case Views.error:
      showError(data);
      break;
    case Views.home:
      showWelcomeMessage(account);
      break;
    case Views.calendar:
      showInbox(data);
      break;
  }
}

function showInbox(events) {


  var div = document.createElement('div');


  div.appendChild(createElement('h1', "title", 'Inbox'));

  div.appendChild(searchfolder);
  div.appendChild(search);

  var table = createElement('table', 'table');
  table.id = "table";
  div.appendChild(table);

  var thead = document.createElement('thead');
  table.appendChild(thead);

  var headerrow = document.createElement('tr');
  thead.appendChild(headerrow);

  var Checkbox = createElement('th', null, 'Checkbox');
  Checkbox.setAttribute('type', 'checkbox');
  headerrow.appendChild(Checkbox);

  var Name = createElement('th', null, 'Name');
  Name.setAttribute('scope', 'col');
  headerrow.appendChild(Name);

  var subject = createElement('th', null, 'Subject');
  subject.setAttribute('scope', 'col');
  headerrow.appendChild(subject);

  var from = createElement('th', null, 'From');
  from.setAttribute('scope', 'col');
  headerrow.appendChild(from);
/*
  var start = createElement('th', null, 'Start');
  start.setAttribute('scope', 'col');
  headerrow.appendChild(start);

  var end = createElement('th', null, 'End');
  end.setAttribute('scope', 'col');
  headerrow.appendChild(end);*/

  var tbody = document.createElement('tbody');
  table.appendChild(tbody);



  content.appendChild(next);
  content.appendChild(back);
  content.appendChild(add);
  content.appendChild(ReadytoSend);

  for (const event of events.value) {
    var eventrow = document.createElement('tr');
    eventrow.setAttribute('key', event.id);
    tbody.appendChild(eventrow);

    var checkboxcell = createElement('INPUT');
    checkboxcell.type = "checkbox";
    checkboxcell.id = "myman"
    eventrow.appendChild(checkboxcell);

    var namecell = createElement('td', null, event.sender.emailAddress.name);
    eventrow.appendChild(namecell);

    var subjectcell = createElement('td', null, event.subject);
    eventrow.appendChild(subjectcell);

    var emailcell = createElement('td', null, event.sender.emailAddress.address);
    eventrow.appendChild(emailcell);


  }


  mainContainer.innerHTML = '';
  mainContainer.appendChild(div);
}

add.setAttribute('onclick','GetSelected()');
add.setAttribute('id', 'add');

ReadytoSend.setAttribute('onclick','sendlist()');
ReadytoSend.setAttribute('id', 'ReadytoSend');

back.setAttribute('onclick', 'nextpage()');
next.setAttribute('onclick', 'backpage()');


back.setAttribute('id', 'nextbutton');
next.setAttribute('id', 'backbutton');

search.setAttribute('onclick', 'changefolder()');


function changefolder(){
  pagename= document.getElementById("foldername").value;
  getEvents();
}

function nextpage(){
  page = page + 10;
  getEvents();
}

function reset(){
  pagename = 'inbox';
  getEvents();
}

function backpage(){
  if(page != 0){
    page = page - 10;
    getEvents();
  } else {
    window.alert("Your at the first entries in your inbox");
  }
}


function GetSelected() {
    var grid = document.getElementById("table");

    //Reference the CheckBoxes in Table.
    var checkBoxes = grid.getElementsByTagName("INPUT");
    
    var message = " ";

    //Loop through the CheckBoxes.
    for (var i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].checked) {
            var row = checkBoxes[i].parentNode;
            if(row.cells[0].innerHTML.trim().indexOf(' ') != -1){ //there is at least one space, excluding leading and training spaces
              receivers[counter] = [row.cells[0].innerHTML.split(' ').slice(0, -1).join(' '), row.cells[2].innerHTML];
            } else{
              receivers[counter] = [row.cells[0].innerHTML, row.cells[2].innerHTML];
            }
            
            counter = counter + 1;
        }
    }

    console.log(receivers)
    //Display selected Row data in Alert Box.
    alert(message);
}

function sendlist(){
  content.innerHTML = '';

  download_csv();
}


function download_csv() {
    var csv = 'First Name,Email\n';
    receivers.forEach(function(row) {
            csv += row.join(',');
            csv += "\n";
    });

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'people.csv';
    hiddenElement.click();
}


updatePage(null, Views.home);