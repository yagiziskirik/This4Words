# This4Words
![Version 0.1.0a](https://img.shields.io/badge/version-0.1.0a-blue) ![License](https://img.shields.io/badge/Licence-MIT-green) ![Maintenance](https://img.shields.io/maintenance/yes/2023)

This4Words is the What3Words replication project which accurately pinpoints a location with precision up to 1 meters and 11 centimetres. What4Words gives results like `this.program.is.awesome` when inputted with geolocations. Currently, there are NodeJS and Python versions of the project are available, and all versions are capable of working offline.

## Setup
Setup of this project is pretty straight-forward since there are no dependencies.

### NodeJS
`cd` into the project directory and run `npm i` command.

### Python
There are no requirements.

## Usage
Using the program is very straight-forward.

### NodeJS
```
cd nodejs
npm run dev
```

Runs the web server. After that, post request with appropriate bodies will give you the correct results.

#### Getting Words from the Coordinates
POST request to the `http://localhost/encrypt` address with the body of `{xCoord: YOUR_X_COORDINATE, yCoord: YOUR_Y_COORDINATE}` will give you the appropriate word group.

#### Getting Coordinates from the Words
POST request to the `http://localhost/decrypt` address with the body of `{str: YOUR_WORD_GROUP}` will give you the appropriate coordinates.

### Python
```
cd python
```

And from there, import the library with the following script and use like this:
```py
from this4words import This4Words
t4w = This4Words()
t4w.encrypt(YOUR_X_COORDINATE, YOUR_Y_COORDINATE)  # Gives you the appropriate word group
t4w.decrypt('YOUR_WORD_GROUP')  # Gives you the appropriate coordinates
```