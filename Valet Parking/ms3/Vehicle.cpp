#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <iomanip>
#include <cstring>
#include "Vehicle.h"
#include "ReadWritable.h"

using namespace std;
namespace sdds
{
    // a Vehicle can be created using a no-argument constructor that sets the Vehicle to a safe Invalid empty state.
    Vehicle::Vehicle()
    {
        this->licensePlate[0] = '\0';
        this->vehicleModel = nullptr;
        this->parkingSpot = 0;
    }
    Vehicle::Vehicle(const char *licensePlate, const char *model)
    {
        if (licensePlate != nullptr && licensePlate[0] != '\0' && model != nullptr)
        {
            vehicleModel = new char[strlen(model) + 1];
            strcpy(this->vehicleModel, model);
            strcpy(this->licensePlate, licensePlate);
            this->parkingSpot = 0;
            delete[] this->vehicleModel;
        }
        else
        {
            this->licensePlate[0] = '\0';
            this->vehicleModel = nullptr;
        }
    }
    Vehicle::~Vehicle()
    {
        delete[] this->vehicleModel;
    }
    //  sets the Vehicle to an invalid empty state
    void Vehicle::setEmpty()
    {
        this->licensePlate[0] = '\0';
        if (this->vehicleModel != nullptr)
            this->vehicleModel[0] = '\0';
        this->parkingSpot = 0;
    }
    Vehicle::Vehicle(const Vehicle &copy)
    {
        setParkingSpot(copy.parkingSpot);
        strcpy(this->licensePlate, copy.licensePlate);

        // deep copying
        if (copy.vehicleModel != nullptr)
        {
            vehicleModel = new char[strlen(copy.vehicleModel) + 1];
            strcpy(this->vehicleModel, copy.vehicleModel);
        }
        else
        {
            this->vehicleModel = nullptr;
        }
    }
    Vehicle &Vehicle::operator=(const Vehicle &assignment)
    {
        setParkingSpot(assignment.parkingSpot);
        strcpy(this->licensePlate, assignment.licensePlate);
        if (this->vehicleModel)
        {
            delete[] vehicleModel;
            vehicleModel = nullptr;
        }
        // deep copying
        if (assignment.vehicleModel != nullptr)
        {
            vehicleModel = new char[strlen(assignment.vehicleModel) + 1];
            strcpy(this->vehicleModel, assignment.vehicleModel);
        }
        else
        {
            this->vehicleModel = nullptr;
        }
        return *this;
    }
    void Vehicle::toUpper(char *upper_case) const
    {
        int i{0};
        while (upper_case[i] != '\0')
        {
            upper_case[i] = toupper(upper_case[i]);
            i++;
        }
    }
    // This function returns true if the Vehicle is in an invalid empty state, or else, it returns false.
    bool Vehicle::isEmpty() const
    {
        return (licensePlate[0] == '\0' && vehicleModel == nullptr);
    }
    // This function returns a read-only address of the license plate of the Vehicle.
    const char *Vehicle::getLicensePlate() const
    {
        return this->licensePlate;
    }
    // This function returns a read-only address of the make and model of the Vehicle.
    const char *Vehicle::getMakeModel() const
    {
        return this->vehicleModel;
    }
    // This function resets the make and model of the Vehicle to a new value. If the new value is null or empty, the object is set to an invalid empty state.
    void Vehicle::setMakeModel(const char *makeModel)
    {
        if (makeModel != nullptr && makeModel[0] != '\0')
        {
            strcpy(this->vehicleModel, makeModel);
        }
        else
        {
            this->vehicleModel = nullptr;
        }
    }
    // This function returns the parking spot number of the Vehicle.
    int Vehicle::getParkingSpot() const
    {
        return this->parkingSpot;
    }
    // Resets the parking spot number to a new value. If the value is invalid, it will set the vehicle to an Invalid empty state.
    void Vehicle::setParkingSpot(int parking_spot)
    {
        this->parkingSpot = parking_spot;
    }
    // Compares the license plate of the Vehicle with a license plate value and returns true if the two license plates are identical or else it returns false.
    bool Vehicle::operator==(const char *license_value) const
    {
        char *licence_park;
        char *licence_park2;
        licence_park = new char[strlen(licensePlate) + 1];
        strcpy(licence_park, this->licensePlate);
        licence_park2 = new char[strlen(license_value) + 1];
        strcpy(licence_park2, license_value);
        toUpper(licence_park);
        toUpper(licence_park2);
        bool equal = (strcmp(licence_park, licence_park2) == 0);
        delete[] licence_park;
        delete[] licence_park2;
        return equal;
    }
    // Compares two Vehicles and if they have the same license plate, it will return true, or else it returns false.
    bool Vehicle::operator==(const Vehicle &license) const
    {

        char *licence_park;
        char *licence_park2;
        licence_park = new char[strlen(license.licensePlate) + 1];
        strcpy(licence_park, license.licensePlate);
        licence_park2 = new char[strlen(license.licensePlate) + 1];
        strcpy(licence_park2, license.licensePlate);
        toUpper(licence_park);
        toUpper(licence_park2);
        bool equal = (strcmp(licence_park, licence_park2) == 0);
        delete[] licence_park;
        delete[] licence_park2;
        return equal;
    }
    // This function overrides the Read of the ReadWritable class.
    std::istream &Vehicle::read(std::istream &istr)
    {
        delete[] this->vehicleModel;
        this->setEmpty();

        if (this->isCsv())
        {
            delete[] this->vehicleModel;
            this->setEmpty();

            istr >> this->parkingSpot;
            istr.ignore(1000, ',');
            istr.getline(this->licensePlate, 8, ',');
            toUpper(this->licensePlate);

            char temp[60]{};
            istr.getline(temp, 60, ',');

            this->vehicleModel = new char[strlen(temp) + 1];
            strcpy(this->vehicleModel, temp);
            istr.clear();
        }
        else
        {
            bool flag = true;
            char temp[60]{};

            delete[] this->vehicleModel;
            this->setEmpty();

            cout << "Enter License Plate Number: ";
            do
            {
                istr.getline(this->licensePlate, 8);

                if (istr.fail())
                {
                    istr.clear();
                    istr.ignore(1000, '\n');
                    cout << "Invalid License Plate, try again: ";
                }
                else
                {
                    flag = false;
                    toUpper(this->licensePlate);
                }
            } while (flag);

            flag = true;

            cout << "Enter Make and Model: ";
            do
            {
                istr.getline(temp, 60);

                if (istr.fail() || strlen(temp) < 2)
                {
                    cout << "Invalid Make and model, try again: ";
                }
                else
                {
                    flag = false;
                    this->vehicleModel = new char[strlen(temp) + 1];
                    strcpy(this->vehicleModel, temp);
                    delete[] this->vehicleModel;
                    this->vehicleModel = nullptr;
                    
                }
            } while (flag);

            this->parkingSpot = 0;
        }
        if (istr.fail())
        {
            istr.clear();
            istr.ignore(1000, '\n');
            delete[] this->vehicleModel;

            this->setEmpty();
        }

        return istr;
    }
    // // writeType** receives and returns a reference of ostream.
    // std::ostream &Vehicle::writeType(std::ostream &os) const {
    //     return ReadWritable::write(os);
    // }

    // If the Vehicle is in an invalid empty state, this function will write the following message using the ostream object and returns it.
    std::ostream &Vehicle::write(std::ostream &ostr) const
    {
        if (this->isEmpty())
        {
            ostr << "Invalid Vehicle Object" << endl;
        }
        else
        {
            this->writeType(ostr);
            if (this->isCsv())
            {
                ostr << this->parkingSpot << ",";
                ostr << this->licensePlate << ",";
                ostr << this->vehicleModel << ",";
            }
            else
            {
                ostr << "Parking Spot Number: ";
                if (this->getParkingSpot() <= 0)
                    ostr << "N/A" << endl;
                else
                    ostr << this->parkingSpot << endl;

                ostr << "License Plate: " << this->getLicensePlate() << endl;
                ostr << "Make and Model: " << this->getMakeModel() << endl;
                
            }
        }
        return ostr;
    }
   
}