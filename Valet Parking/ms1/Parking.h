/* Final Project Milestone 1
Module: Parking
Filename: Parking.h
Version 1.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/19
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/

#ifndef SDDS_PARKING_H_
#define SDDS_PARKING_H_
#include <iostream>
#include "Menu.h"

using namespace std;
namespace sdds
{
    class Parking
    {
        char *park;
        Menu main;
        Menu selections;

        bool isEmpty() const;
        void parkingStatus() const;
        void parkVehicle() const;
        void returnVehicle() const;
        void listParkedVehicles() const;
        void findVehicle() const;
        bool closeParking() const;
        bool exitParkingApp() const;
        bool loadDataFile() const;
        void saveDataFile() const;

    public:
        Parking(const char *cstr);
        ~Parking();

        Parking(const Parking &not_copy) = delete;
        void operator=(const Parking &not_assign) = delete;

        int run() const;
    };
}

#endif