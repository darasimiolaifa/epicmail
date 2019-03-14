[![Build Status](https://travis-ci.org/darasimiolaifa/epicmail.svg?branch=develop)](https://travis-ci.org/darasimiolaifa/epicmail)
[![Maintainability](https://api.codeclimate.com/v1/badges/1e5e2993f2e40fe8ef4c/maintainability)](https://codeclimate.com/github/darasimiolaifa/epicmail/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/darasimiolaifa/epicmail/badge.svg?branch=develop)](https://coveralls.io/github/darasimiolaifa/epicmail?branch=develop)

# epicmail
A web application for sending, receiving and managing electronic mails.

## Project Overview
More than ever, people are pushng for more connection. From the very early days of the invention of electronic mails, to the more recent social messaging apps, man is always on a continuous drive to connect with the things and people important in his life. Whether for the sake of work, pleasure or otherwise, man wants to stay connected.

It is in this context, and our nature as EPIC Andelans, working towards advancing human potential and giving back to the society, we wish to empower people by providing them with a web app that helps them exchange messages/information over the internet. Whenever, with whomever, and for whatever purpose they deem fit.

### Required Features
1. Users can sign up.
2. Users can login.
3. Users can create groups.
4. Users can send a message to individuals.
5. Users can view their inbox and read messages.
6. Users can retract sent messages.
7. Users can save an email as draft and send it later or delete it.

### Optional Features
1. User can reset password.
2. Integrate Twilio and deliver messages via SMS.
3. Users can upload a profile photo.

### UI Templates
The UI templates for the project can be found here [EPIC-Mail](https://darasimiolaifa.github.io/epicmail/UI)


### Pivotal Tracker

To make the project easy to manage and track, we are using the Pivotal Tracker tool. The board for the stories are located here. [Project Story Board](https://www.pivotaltracker.com/n/projects/2314641)

### API Endpoints.
##### Base URL 
The project API base is hosted here on [Heroku](https://darasimi-epicmail.herokuapp.com/)

S/N | Verb   | Endpoint                 | Description             |
---:| -------|--------------------------|-------------------------|
  1 | Post   | /api/v1/auth/signup      | Create a user account   |
  2 | Post   | /api/v1//auth/login      | Sign in a user          |
  3 | Get    | /api/v1//messages        | Get all received emails |
  4 | Get    | /api/v1//messages/unread | Get all unread emails   |
  5 | Get    | /api/v1//messages/sent   | Get all emails sent     |
  6 | Get    | /api/v1//messages/id     | Get a specific email    |
  7 | Post   | /api/v1//messages        | Send email to users     |
  8 | Delete | /api/v1//messages/id     | Delete an email         |

### API Documentation :file_folder: :point_left:
The API documentation page can be found here [Documentation](https://darasimi-epicmail.herokuapp.com/api/v1/docs)


### Author
Darasimi Olaifa

### Acknowledgements
* Andela