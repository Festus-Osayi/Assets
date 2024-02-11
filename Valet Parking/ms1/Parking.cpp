/* Name: Faisal A Mohammed Abdulateef
   Class Section: OOP244 ZDD
   Student ID: 163686215 */

#include <iostream>
#include <cstring>
#include <stdio.h>
#include <ctype.h>
#include "Parking.h"
#include "Menu.h"
#include "Utils.h"

using namespace std;
namespace sdds
{
    Parking::Parking(const char* string) : main("Parking Menu, select an action:", 0), selections("Select type of the vehicle:", 1)
    {
        if (string == nullptr || string[0] == '\0')
        {
            this->park = nullptr;
            main.menusetEmpty();
            selections.menusetEmpty();
            cout << "Error in data file" << endl;
        }
        else
        {
            this->park = new char[strlen(string)];
            strcpy(this->park, string);

            if (Parking::loadDataFile())
            {
                main << "Park Vehicle" << "Return Vehicle" << "List Parked Vehicles" << "Find Vehicle" << "Close Parking (End of day)" << "Exit Program";
                selections << "Car" << "Motorcycle" << "Cancel";
            }
            else
            {
                cout << "Error in data file" << endl;
            }
        }
    }

    Parking::~Parking()
    {
        delete[] this->park;
        this->park = nullptr;
    }

    bool Parking::isEmpty() const { return this->park == nullptr || this->park[0] == '\0'; }

    void Parking::parkingStatus() const
    {
        cout << "****** Valet Parking ******" << endl;
    }

    void Parking::parkVehicle() const
    {
        int selection;

        selection = selections.run();

        if (selection == 1)
        {
            cout << "---------------------------------" << endl;
            cout << "Parking Car" << endl;
            cout << "---------------------------------" << endl << endl;
        }

        else if (selection == 2)
        {
            cout << "---------------------------------" << endl;
            cout << "Parking Motorcycle" << endl;
            cout << "---------------------------------" << endl << endl;
        }

        else if (selection == 3)
        {
            cout << "---------------------------------" << endl;
            cout << "Cancelled Parking" << endl;
            cout << "---------------------------------" << endl << endl;
        }
    }

    void Parking::returnVehicle() const
    {
        cout << "---------------------------------" << endl;
        cout << "Returning Vehicle" << endl;
        cout << "---------------------------------" << endl << endl;
    }

    void Parking::listParkedVehicles() const
    {
        cout << "---------------------------------" << endl;
        cout << "Listing Parked Vehicles" << endl;
        cout << "---------------------------------" << endl << endl;
    }

    void Parking::findVehicle() const
    {
        cout << "---------------------------------" << endl;
        cout << "Finding a Vehicle" << endl;
        cout << "---------------------------------" << endl << endl;
    }

    bool Parking::closeParking() const
    {
        bool check = false;
        char y_n;
        cout << "This will close the parking; All the vehicles will be removed!" << endl;
        cout << "Are you sure? (Y)es/(N)o: ";

        do
        {
            cin >> y_n;

            if (toupper(y_n) != 'Y' && toupper(y_n) != 'N')
            {
                cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
            }

            else if (toupper(y_n) == 'Y')
            {
                check = true;
                cout << "Ending application!" << endl;
                break;
            }

            else if (toupper(y_n) == 'N')
            {
                check = false;
                break;
            }

        } while (toupper(y_n) != 'Y' && toupper(y_n) != 'N');

        return check;
    }

    bool Parking::exitParkingApp() const
    {
        bool check = false;
        char yORn;
        cout << "This will terminate the application and save the data!" << endl;
        cout << "Are you sure? (Y)es/(N)o: ";

        do
        {
            cin >> yORn;

            if (toupper(yORn) != 'Y' && toupper(yORn) != 'N')
            {
                cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
            }

            else if (toupper(yORn) == 'Y')
            {
                check = true;
                cout << "Exiting application!" << endl;
                Parking::saveDataFile();
                break;
            }

            else if (toupper(yORn) == 'N')
            {
                check = false;
                break;
            }

        } while (toupper(yORn) != 'Y' && toupper(yORn) != 'N');

        return check;
    }

    bool Parking::loadDataFile() const
    {
        bool check = false;

        if (this->park != nullptr || this->park[0] != '\0')
        {
            check = true;
            cout << "---------------------------------" << endl;
            cout << "loading data from " << this->park << endl;
            cout << "---------------------------------" << endl << endl;
        }
        else
        {
            check = false;
        }

        return check;
    }

    void Parking::saveDataFile() const
    {
        if (this->park != nullptr || this->park[0] != '\0')
        {
            cout << "---------------------------------" << endl;
            cout << "Saving data into " << this->park << endl;
            cout << "---------------------------------" << endl;
        }
    }

    int Parking::run() const
    {
        int menu;
        bool exit;

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
                    bool exit = Parking::closeParking();
                    break;

                case 6:
                    exit = Parking::exitParkingApp();
                    break;
                }

            } while (!exit);

            return 0;
        }

        return 1;
    }
}