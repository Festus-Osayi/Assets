/* Final Project Milestone 1
Module: Parking
Filename: Parking.cpp
Version 1.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/19
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/

#include <iostream>
#include <cstring>
#include <ctype.h>
#include "Parking.h"
#include "Menu.h"
#include "Utils.h"

using namespace std;
namespace sdds
{
    // Parking holds a C-style string with an unknown size to hold the data path and file name of the application.
    Parking::Parking(const char *cstr) : main("Parking Menu, select an action:", 0), selection("Select type of the vehicle:", 1)
    {
        bool success = cstr == nullptr || cstr[0] == '\0';
        if (success)
        {
            this->park = nullptr;
            main.menusetEmpty();
            selection.menusetEmpty();
            cout << "Error in data file" << endl;
        }
        else
        {
            this->park = new char[strlen(cstr) + 1];
            strcpy(this->park, cstr);

            if (Parking::loadDataFile())
            {
                main << "Park Vehicle"
                         << "Return Vehicle"
                         << "List Parked Vehicles"
                         << "Find Vehicle"
                         << "Close Parking (End of day)"
                         << "Exit Program";
                selection << "Car"
                              << "Motorcycle"
                              << "Cancel";
            }
            else
            {
                cout << "Error in data file" << endl;
            }
        }
    }
    //Make sure there is no memory leak when the Parking goes out of scope.
    Parking::~Parking()
    {
        delete[] this->park;
        this->park = nullptr;
    }

    // an isEmpty function that returns true if the Parking is in an invalid empty State or false if the parking is valid and usable.
    bool Parking::isEmpty() const { 
        if(this->park == nullptr || this->park[0] == '\0') return true; 
        else return false;
    }

    // This function does not receive or return anything and at this stage only prints:
    void Parking::parkingStatus() const
    {
        cout << "****** Valet Parking ******" << endl;
    }
    // The function displays the Vehicle Selection sub-menu. Then based on the user's selection; Car, Motorcycle or Cancel, it will print.
    void Parking::parkVehicle() const
    {
        auto user_selection = selection.run();
        switch (user_selection)
        {
        case 1:
            cout << "---------------------------------" << endl;
            cout << "Parking Car" << endl;
            cout << "---------------------------------" << endl <<endl;
            break;
        case 2:
            cout << "---------------------------------" << endl;
            cout << "Parking Motorcycle" << endl;
            cout << "---------------------------------" << endl<<endl;
            break;
        case 3:
            cout << "---------------------------------" << endl;
            cout << "Cancelled parking" << endl;
            cout << "---------------------------------" << endl<<endl;
            break;
        }
    }

    void Parking::returnVehicle() const
    {
        cout << "---------------------------------" << endl;
        cout << "Returning Vehicle" << endl;
        cout << "---------------------------------" << endl
             << endl;
    }

    void Parking::listParkedVehicles() const
    {
        cout << "---------------------------------" << endl;
        cout << "Listing Parked Vehicles" << endl;
        cout << "---------------------------------" << endl
             << endl;
    }

    void Parking::findVehicle() const
    {
        cout << "---------------------------------" << endl;
        cout << "Finding a Vehicle" << endl;
        cout << "---------------------------------" << endl
             << endl;
    }

    bool Parking::closeParking() const
    {
        bool success = false;
        char user_selection;
        cout << "This will close the parking; All the vehicles will be removed!" << endl;
        cout << "Are you sure? (Y)es/(N)o: ";

        do
        {
            cin >> user_selection;

            if (toupper(user_selection) != 'Y' && toupper(user_selection) != 'N')
            {
                cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
            }

            else if (toupper(user_selection) == 'Y')
            {
                success = true;
                cout << "Ending application!" << endl;
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

    bool Parking::exitParkingApp() const
    {
        
            bool success = false;
            char user_selection;
            cout << "This will terminate the application and save the data!" << endl;
            cout << "Are you sure? (Y)es/(N)o: ";

            do
            {
                cin >> user_selection;

                if (toupper(user_selection) != 'Y' && toupper(user_selection) != 'N')
                {
                    cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
                }

                else if (toupper(user_selection) == 'Y')
                {
                    success = true;
                    cout << "Exiting application!" << endl;
                    Parking::saveDataFile();
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

    bool Parking::loadDataFile() const
    {       
            bool success = this->park != nullptr || this->park[0] != '\0';
            if (success)
            {
                
                cout << "---------------------------------" << endl;
                cout << "loading data from " << this->park << endl;
                cout << "---------------------------------" << endl
                     << endl;
                     
        }
        else
        {
            return false;
        }

        return 1;
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
        int selection = 0;
        bool EXIT = false;
        

        if (!Parking::isEmpty())
        {
            do
            {
                Parking::parkingStatus();
                selection = main.run();

                switch (selection)
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
                    EXIT = Parking::closeParking();
                    break;

                case 6:
                    EXIT = Parking::exitParkingApp();
                    break;
                }

            } while (!EXIT);

            return 0;
        }

        return 1;
    }
}