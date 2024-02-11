/* Final Project Milestone 3
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
#include <string.h>
#include "Vehicle.h"

namespace sdds
{
    // sets the Vehicle to an invalid empty state
    void Vehicle::setEmpty()
    {
        licensePlate[0] = '\0';
        vehicleModel = nullptr;
        parkSpot = 0;
    }

    // This function returns true if the Vehicle is in an invalid empty state, or else, it returns false.
    bool Vehicle::isEmpty() const
    {
        return licensePlate[0] == '\0' || vehicleModel == nullptr;
    }
    // This function returns a read-only address of the license plate of the Vehicle.
    const char *Vehicle::getLicensePlate()
    {
        return licensePlate;
    }
    // This function returns a read-only address of the make and model of the Vehicle.
    const char *Vehicle::getMakeModel()
    {
        return vehicleModel;
    }
    // his function resets the make and model of the Vehicle to a new value. If the new value is null or empty, the object is set to an invalid empty state.
    void Vehicle::setMakeModel(const char *makeModel)
    {
        if (makeModel != nullptr && makeModel[0] != '\0' && strlen(makeModel) >= 2)
        {
            int sze = strlen(makeModel) + 1;
            delete[] vehicleModel;
            vehicleModel = new char[sze];
            strcpy(vehicleModel, makeModel);
        }
        else
        {
            delete[] vehicleModel;
            setEmpty();
        }
    }
    //
    Vehicle::Vehicle() : ReadWritable()
    {
        setEmpty();
    }

    Vehicle::Vehicle(const char *plate, const char *makeModel, int spotNum) : ReadWritable()
    {
        setEmpty();
        if (plate != nullptr && plate[0] != '\0' && strlen(plate) <= MAX_LENGTH)
        {
            strncpy(licensePlate, plate, MAX_LENGTH);
            licensePlate[MAX_LENGTH] = '\0';
            toUpper(licensePlate);
        }
        else
        {
            licensePlate[0] = '\0';
        }
        setMakeModel(makeModel);
        setParkingSpot(spotNum);
    }
    // This function returns the parking spot number of the Vehicle.
    int Vehicle::getParkingSpot() const
    {
        return parkSpot;
    }
    // Resets the parking spot number to a new value. If the value is invalid, it will set the vehicle to an Invalid empty state.
    void Vehicle::setParkingSpot(int spotNum)
    {
        if (spotNum >= 0)
        {
            parkSpot = spotNum;
        }
        else
        {
            delete[] vehicleModel;
            setEmpty();
        }
    }
    // Compares the license plate of the Vehicle with a license plate value and returns true if the two license plates are identical or else it returns false. This comparison is NOT case sensitive (i.e. “123ABC” is the same as “123abc”).
    bool operator==(Vehicle &v, const char *plate)
    {
        bool same = false;
        if (!v.isEmpty())
        {
            if (plate != nullptr && plate[0] != '\0' && strlen(plate) <= MAX_LENGTH)
            {
                if (strICmp(v.licensePlate, plate))
                {
                    same = true;
                }
            }
        }

        return same;
    }
    // Compares two Vehicles and if they have the same license plate, it will return true, or else it returns false.This comparison is NOT case-sensitive.
    bool operator==(Vehicle &v1, Vehicle &v2)
    {
        bool same = false;
        if (!v1.isEmpty() && !v2.isEmpty())
        {
            if (strICmp(v1.licensePlate, v2.licensePlate))
            {
                same = true;
            }
        }

        return same;
    }
    // This function overrides the Read of the ReadWritable class.

    std::istream &Vehicle::read(std::istream &istr)
    {
        if (isCsv())
        {
            istr >> parkSpot;
            istr.ignore();
            istr.getline(licensePlate, MAX_LENGTH + 1, ',');
            toUpper(licensePlate);
            char temp[60 + 1] = {'\0'};
            istr.getline(temp, 60 + 1, ',');
            setMakeModel(temp);
        }
        else
        {
            std::cout << "Enter License Plate Number: ";
            int invalid;
            do
            {
                invalid = 0;
                istr >> licensePlate;
                istr.ignore();
                if (strlen(licensePlate) > 8)
                {
                    invalid = 1;
                    std::cout << "Invalid License Plate, try again: ";
                }
            } while (invalid);
            toUpper(licensePlate);

            std::cout << "Enter Make and Model: ";
            char temp[60 + 1] = {'\0'};
            do
            {
                invalid = 0;
                istr.getline(temp, 60 + 1);
                if (strlen(temp) < 2 || strlen(temp) > 60)
                {
                    invalid = 1;
                    std::cout << "Invalid Make and model, try again: ";
                }
            } while (invalid);
            setMakeModel(temp);

            parkSpot = 0;
        }

        if (istr.fail())
        {
            istr.clear();
            setEmpty();
        }

        return istr;
    }
    // If the Vehicle is in an invalid empty state, this function will write the following message using the ostream object and returns it.
    std::ostream &Vehicle::write(std::ostream &ostr) const
    {
        if (isEmpty())
        {
            ostr << "Invalid Vehicle Object" << std::endl;
        }
        else
        {
            writeType(ostr);

            if (isCsv())
            {
                ostr << parkSpot << "," << licensePlate << "," << vehicleModel << ",";
            }
            else
            {
                ostr << "Parking Spot Number: ";
                if (parkSpot <= 0)
                {
                    ostr << "N/A" << std::endl;
                }
                else
                {
                    ostr << parkSpot << std::endl;
                }
                ostr << "License Plate: " << licensePlate << std::endl;
                ostr << "Make and Model: " << vehicleModel << std::endl;
            }
        }

        return ostr;
    }
    // This function safely deallocates any memory which was allocated, in other to prevent memeory leaks.
    Vehicle::~Vehicle()
    {
        delete[] vehicleModel;
        vehicleModel = nullptr;
    }
    // a Vehicle is copied to another vehicle safely.
    Vehicle::Vehicle(const Vehicle &copy)
    {
        setParkingSpot(copy.parkSpot);
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
    // a Vehicle is assigned to another vehicle safely and also make sure there is no memory leach when going out of scope or deleted.
    Vehicle &Vehicle::operator=(const Vehicle &assignment)
    {
        setParkingSpot(assignment.parkSpot);
        strcpy(this->licensePlate, assignment.licensePlate);
        this->setCsv(assignment.isCsv());
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

}