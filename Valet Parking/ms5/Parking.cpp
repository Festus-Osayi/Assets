/* Final Project Milestone 5
Module: Vehicle
Filename: Vehicle.cpp
Version 3.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/26
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/

#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <fstream>
#include <cstring>
#include <string>
#include <stdio.h>
#include <ctype.h>
#include "Parking.h"
#include "Menu.h"
#include "Car.h"
#include "Motorcycle.h"
#include "Vehicle.h"

using namespace std;
namespace sdds
{
    Parking::Parking(const char *datafile, int noOfSpots) : main("Parking Menu, select an action:", 0), menu("Select type of the vehicle:", 1)
    {
        if (datafile == nullptr || datafile[0] == '\0')
        {
            this->park = nullptr;
            main.menusetEmpty();
            menu.menusetEmpty();
            cout << "Error in park file" << endl;
        }
        else
        {
            this->park = new char[strlen(datafile) + 1];
            strcpy(this->park, datafile);

            if (Parking::loadparkFile())
            {
                main << "Park Vehicle"
                     << "Return Vehicle"
                     << "List Parked Vehicles"
                     << "Find Vehicle"
                     << "Close Parking (End of day)"
                     << "Exit Program";
                menu << "Car"
                     << "Motorcycle"
                     << "Cancel";
            }
            else
            {
                cout << "Error in park file" << endl;
            }
        }

        if (noOfSpots < 10 || noOfSpots > maxSpots)
        {
            this->parkNum = -1;
            this->noSpot = -1;
        }
        else
        {
            this->noSpot = noOfSpots;
        }
    }

    Parking::~Parking()
    {
        this->saveparkFile();

        delete[] this->park;
        this->park = nullptr;

        for (int i = 0; i < maxSpots; i++)
        {
            if (this->arrVehicle[i] != nullptr)
            {
                delete this->arrVehicle[i];
                this->arrVehicle[i] = nullptr;
            }
        }
    }

    bool Parking::isEmpty() const { return this->park == nullptr || this->park[0] == '\0'; }

    void Parking::parkingStatus() const
    {
        cout << "****** Valet Parking ******" << endl;
        cout << "*****  Available spots: ";

        cout.setf(ios::left);
        cout.width(4);
        cout << (this->noSpot - this->parkNum);
        cout.unsetf(ios::left);

        cout << " *****" << endl;
    }

    void Parking::parkVehicle()
    {
        int selection;
        Vehicle *attribute{};

        if (this->noSpot == this->parkNum)
        {
            cout << "Parking is full";
        }
        else
        {
            selection = menu.run();

            if (selection == 1)
            {
                attribute = new Car();
                attribute->setCsv(false);
                attribute->read(cin);

                for (int i = 0; i < this->noSpot; i++)
                {
                    if (this->arrVehicle[i] == nullptr)
                    {
                        this->arrVehicle[i] = attribute;
                        this->arrVehicle[i]->setParkingSpot(i + 1);
                        cout << endl
                             << "Parking Ticket" << endl;
                        this->arrVehicle[i]->write(cout) << endl;
                        this->parkNum++;
                    }
                }
            }

            else if (selection == 2)
            {
                attribute = new Motorcycle();
                attribute->setCsv(false);
                attribute->read(cin);

                for (int i = 0; i < this->noSpot; i++)
                {
                    if (this->arrVehicle[i] == nullptr)
                    {
                        this->arrVehicle[i] = attribute;
                        this->arrVehicle[i]->setParkingSpot(i + 1);
                        cout << endl
                             << "Parking Ticket" << endl;
                        this->arrVehicle[i]->write(cout) << endl;
                        this->parkNum++;
                    }
                }
            }

            else if (selection == 3)
            {
                cout << "Parking Cancelled" << endl;
            }
        }
    }

    void Parking::returnVehicle()
    {
        char licensePlate[9];
        bool licensesuccess = false;
        bool success = false;

        cout << "Return Vehicle" << endl;
        cout << "Enter License Plate Number: ";

        while (licensesuccess == false)
        {
            cin.get(licensePlate, 8, '\n');

            if (strlen(licensePlate) < 1 || strlen(licensePlate) > 8)
            {
                cout << "Invalid License Plate, try again: ";
            }
            else
            {
                licensesuccess = true;
            }
        }

        int strLen = strlen(licensePlate);
        for (int i = 0; i < strLen; i++)
        {
            licensePlate[i] = toupper(licensePlate[i]);
        }

        for (int i = 0; i < this->noSpot; i++)
        {
            if (this->arrVehicle[i] != nullptr)
            {
                if (*this->arrVehicle[i] == licensePlate)
                {
                    success = true;

                    cout << endl
                         << "Returning:" << endl;
                    this->arrVehicle[i]->write(cout) << endl;
                    this->parkNum--;

                    delete this->arrVehicle[i];
                    this->arrVehicle[i] = nullptr;
                }
            }
        }

        if (success == false)
        {
            cout << endl
                 << "License plate " << licensePlate << " Not found" << endl
                 << endl;
        }

        cout << "Press <ENTER> to continue...." << endl;
        cin.ignore(5000, '\n');
    }

    void Parking::listParkedVehicles() const
    {
        cout << "*** List of parked vehicles ***" << endl;

        for (int i = 0; i < maxSpots; i++)
        {
            if (this->arrVehicle[i] != nullptr)
            {
                this->arrVehicle[i]->write(std::cout);
                cout << "-------------------------------" << endl;
            }
        }

        cout << "Press <ENTER> to continue....";
        cin.ignore(5000, '\n');
    }

    void Parking::findVehicle()
    {
        char licensePlate[9];
        bool licensesuccess = false;
        bool success = false;

        cout << "Vehicle Search" << endl;
        cout << "Enter Licence Plate Number: ";

        while (licensesuccess == false)
        {
            cin.getline(licensePlate, 8);

            int strLength = strlen(licensePlate);

            if (strLength < 1 || strLength > 8)
            {
                cout << "Invalid Licence Plate, try again: ";
            }
            else
            {
                licensesuccess = true;
            }
        }

         int strLength = strlen(licensePlate);
        for (int i = 0; i < strLength; i++)
        {
            licensePlate[i] = toupper(licensePlate[i]);
        }

        for (int i = 0; i < this->noSpot; i++)
        {
            if (this->arrVehicle[i] != nullptr)
            {
                if (*this->arrVehicle[i] == licensePlate)
                {
                    success = true;

                    cout << endl << "Vehicle found:  " << endl;
                    this->arrVehicle[i]->write(cout) << endl;
                }
            }
        }

        if (success == false)
        {
            cout << endl
                 << "License plate " << licensePlate << " Not found" << endl
                 << endl;
        }

        cout << "Press <ENTER> to continue....";
        cin.ignore(5000, '\n');
    }

    bool Parking::closeParking()
    {
        bool success = false;
        char user_selection;

        if (this->isEmpty())
        {
            cout << "Closing Parking" << endl;
            success = true;
        }
        else
        {
            cout << "This will Remove and tow all remaining vehicles from the parking!" << endl;
            cout << "Are you sure? (Y)es/(N)o: ";

            do
            {
                cin >> user_selection;
                cin.ignore(1000, '\n');

                if (toupper(user_selection) != 'Y' && toupper(user_selection) != 'N')
                {
                    cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
                }

                else if (toupper(user_selection) == 'Y')
                {
                    cout << "Closing Parking" << endl;

                    for (int i = 0; i < maxSpots; i++)
                    {
                        if (this->arrVehicle[i] != nullptr)
                        {
                            cout << endl
                                 << "Towing request" << endl;
                            cout << "*********************" << endl;
                            this->arrVehicle[i]->write(cout);
                            delete this->arrVehicle[i];
                            this->arrVehicle[i] = nullptr;
                        }
                    }

                    success = true;
                    break;
                }

                else if (toupper(user_selection) == 'N')
                {
                    success = false;
                    break;
                }

            } while (toupper(user_selection) != 'Y' && toupper(user_selection) != 'N');
        }

        return success;
    }

    bool Parking::exitParkingApp() const
    {
        bool success = false;
        char user_selection;
        cout << "This will terminate the program!" << endl;
        cout << "Are you sure? (Y)es/(N)o: ";

        do
        {
            cin >> user_selection;
            cin.ignore(1000, '\n');

            if (toupper(user_selection) != 'Y' && toupper(user_selection) != 'N')
            {
                cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
            }

            else if (toupper(user_selection) == 'Y')
            {
                success = true;
                cout << "Exiting program!" << endl;
                Parking::saveparkFile();
                break;
            }

            else if (toupper(user_selection) == 'N')
            {
                success = false;
                break;
            }

        } while (toupper(user_selection) != 'Y' && toupper(user_selection) != 'N');

        return success;
    }

    bool Parking::loadparkFile()
    {
        bool success = true;
        char tempVar{};
        Vehicle *attribute{};

        if (!isEmpty())
        {
            ifstream file(this->park, ios::in);

            if (!file.is_open())
            {
                success = true;
            }
            else
            {
                while (file.get(tempVar))
                {
                    file.ignore(1000, ',');

                    if (tempVar == 'C')
                    {
                        attribute = new Car();

                        attribute->setCsv(true);
                        attribute->read(file);
                        attribute->setCsv(false);

                        int parkingSpots = attribute->getParkingSpot();
                        this->arrVehicle[parkingSpots - 1] = attribute;
                        this->parkNum++;
                    }

                    else if (tempVar == 'M')
                    {
                        attribute = new Motorcycle();

                        attribute->setCsv(true);
                        attribute->read(file);
                        attribute->setCsv(false);

                        int parkingSpots = attribute->getParkingSpot();
                        this->arrVehicle[parkingSpots - 1] = attribute;
                        this->parkNum++;
                    }

                    else
                    {
                        delete attribute;
                        attribute = nullptr;
                        success = false;
                    }
                }
            }
        }
        else
        {
            success = false;
        }

        return success;
    }

    void Parking::saveparkFile() const
    {
        ofstream file(this->park, ios::out);

        if (file.is_open())
        {
            for (int i = 0; i < this->noSpot; i++)
            {
                if (this->arrVehicle[i] != nullptr)
                {
                    this->arrVehicle[i]->setCsv(true);
                    this->arrVehicle[i]->write(file);
                }
            }
        }

        file.close(); // optional but considers best practices
    }

    int Parking::run()
    {
        int menu = 0;
        bool success = false;

        if (!Parking::isEmpty())
        {
            do
            {
                Parking::parkingStatus();
                menu = main.run();

                switch (menu)
                {
                case 1:
                    Parking::parkVehicle();
                    cout << "Press <ENTER> to continue...." << endl;
                    cin.ignore(5000, '\n');
                    break;

                case 2:
                    Parking::returnVehicle();
                    break;

                case 3:
                    Parking::listParkedVehicles();
                    break;

                case 4:
                    Parking::findVehicle();
                    break;

                case 5:
                    success = Parking::closeParking();
                    break;

                case 6:
                    success = Parking::exitParkingApp();
                    break;
                }

            } while (!success);

            return 0;
        }

        return 1;
    }
}
