# NLP Powered Appointment Detection System

Submitted for the Hackathon conducted in Spring 2017

Tasks:
1. The application allows the users to type a message to a different user.
2. The application allows users to read the messages they have received from other users.
3. The application highlights, via hyperlink, any text you have detected as a possible appointment.
4. When users click on that hyperlink, it displays a popup screen that pre-populates with the detected meeting details (When, Who). Do not worry about location (Where).

Ex: If the message sent to a user is as given below

“I would like to meet with you tomorrow. If that does not work for you, I can stop by 4/17/2016 at 5 pm. I can also talk with you over the phone this afternoon.
Please let me know.
Thanks.”

Then the message will be viewed by the receiver in the following format

“I would like to meet with you <a  href="">tomorrow</a>. If that does not work for you, I can stop by <a  href="">4/17/2016 at 5 pm</a>. I can also talk with you over the phone this afternoon.
Please let me know.
Thanks.”

Named Entity Recognizer in the Intellexar API is used as Natural Language Processor for appontment detection.
