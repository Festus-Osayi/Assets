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
#include <cstring>
#include "Vehicle.h"
#include "Motorcycle.h"
#include "ReadWritable.h"
using namespace std;
namespace sdds
{
    // a Motorcycle can be created using a no-argument constructor that sets the Motorcycle ( and therefore the Base class Vehicle) to a safe Invalid empty state.
    Motorcycle::Motorcycle()
    {
        this->flag = false;
    }
    // Also, a Motorcycle like its base class can be created using a license plate and a make and model value.
    Motorcycle::Motorcycle(const char *license_plate, const char *make_model) : Vehicle(license_plate, make_model)
    {
        this->flag = true;
    }
    // A Motorcycle should be safely copied Motorcycle.
    Motorcycle::Motorcycle(const Motorcycle &copy) : Vehicle(copy)
    {
        this->flag = copy.flag;
    }
    // A Motorcycle should be safely assigned to another Motorcycle.
    Motorcycle &Motorcycle::operator=(const Motorcycle &assignment)
    {
        (Vehicle &)*this = assignment;
        this->flag = assignment.flag;
        this->setCsv(assignment.isCsv());
        return *this;
    }
    // Override the pure virtual method `writeType` to write `"M,"` if the object is in comma-separated values format (isCsv()), or otherwise write `"Vehicle type: Motorcycle"` and a NEWLINE.
    std::ostream &Motorcycle::writeType(std::ostream &os) const
    {
        if (isCsv())
        {
            os << "M,";
        }
        else
        {
            os << "Vehicle type: Motorcycle" << endl;
        }
        return os;
    }
    // This function overrides the read method of the Vehicle class.
    std::istream &Motorcycle::read(std::istream &istr)
    {
        char y_n[5];
        bool success = false;
        int motorcycle_Value;
        if (isCsv())
        {

            Vehicle::read(istr);
            istr >> motorcycle_Value;
            istr.ignore(1000, '\n');
            if (motorcycle_Value == 1)
            {
                this->flag = true;
            }
            else if (motorcycle_Value == 0)
            {
                this->flag = false;
            }
        }
        else
        {
            
            cout << "Motorcycle information entry\n";
            
            Vehicle::read(istr);
            cout << "Does the Motorcycle have a sidecar? (Y)es/(N)o: ";
            do
            {
                cin >> y_n;
                if (strlen(y_n) > 1)
                {
                    cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
                    istr.clear();
                    istr.ignore(2000, '\n');
                }
                else
                {
                    if (toupper(y_n[0]) == 'Y')
                    {
                        this->flag = true;
                        success = true;
                    }
                    else if (toupper(y_n[0]) == 'N')
                    {
                        this->flag = false;
                        success = true;
                    }
                    else
                    {
                        cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
                        istr.clear();
                        istr.ignore(1000, '\n');
                    }
                }

            } while (!success);
        }
        return istr;
    }
    // this function overrides the write method of the Vehicle class.
    std::ostream &Motorcycle::write(std::ostream &ostr)
    {
        if (isEmpty())
        {
            ostr << "Invalid Motorcycle Object";
        }
        else
        {
            Vehicle::write(ostr);
            if (isCsv())
            {
                ostr << this->flag << endl;
            }
            else
            {
                if (this->flag == true) {
                    ostr << "With Sidecar" << endl;
                }
                    
            }
        }
        return ostr;
    }
}