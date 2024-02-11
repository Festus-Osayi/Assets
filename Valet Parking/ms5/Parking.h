/* Final Project Milestone 5
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
#include "Vehicle.h"
#define maxSpots 100

using namespace std;
namespace sdds
{

    class Parking
    {
        char *park{};
        Menu main{};
        Menu menu{};

        int noSpot{};
        Vehicle *arrVehicle[maxSpots]{};
        int parkNum{};

        bool isEmpty() const;
        void parkingStatus() const;
        void parkVehicle();
        void returnVehicle();
        void listParkedVehicles() const;
        void findVehicle();
        bool closeParking();
        bool exitParkingApp() const;
        bool loadparkFile();
        void saveparkFile() const;

    public:
        Parking(const char *parkfile, int noOfSpots);
        ~Parking();

        Parking(const Parking &parking) = delete;
        void operator=(const Parking &parking) = delete;

        int run();
    };
}

#endif