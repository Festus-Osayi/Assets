/* Final Project Milestone 4
Module: Motorcycle
Filename: Motorcycle.cpp
Version 4.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/12/1
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/
#define _CRT_SECURE_NO_WARNINGS
#include <iostream>
#include <cstring>
#include "Vehicle.h"
#include "ReadWritable.h"
#include "Car.h"
#include "Motorcycle.h"

using namespace std;
namespace sdds
{
    Motorcycle::Motorcycle() : Vehicle()
    {
        this->flag = false;
    }

    Motorcycle::Motorcycle(const char* plate, const char* model) : Vehicle(plate, model)
    {
        if (plate != nullptr && model != nullptr)
        {
            this->flag = false;
        }
    }

    Motorcycle::Motorcycle(const Motorcycle& copy) : Vehicle(copy)
    {
        this->flag = copy.flag;
    }

    Motorcycle& Motorcycle::operator=(const Motorcycle& assignment)
    {
        (Vehicle&)*this = assignment;
        this->flag = assignment.flag;

        return *this;
    }

    ostream& Motorcycle::writeType(ostream& os) const
    {
        if (ReadWritable::isCsv())
        {
            os << "M,";
        }
        else
        {
            os << "Vehicle type: Motorcycle" << endl;
        }

        return os;
    }

    istream& Motorcycle::read(istream& istr)
    {
        bool check = false;
        int value = 0;
        char y_n[5];

        if (ReadWritable::isCsv())
        {
            Vehicle::read(istr);

            istr >> value;
            istr.ignore(1000, '\n');

            if (value == 1)
            {
                this->flag = true;
            }

            else if (value == 0)
            {
                this->flag = false;
            }
        }
        else
        {
            cout << endl;
            cout << "Motorcycle information entry" << endl;

            Vehicle::read(istr);
            cout << "Does the Motorcycle have a side car? (Y)es/(N)o: ";

            while (check == false)
            {
                istr >> y_n;

                if (strlen(y_n) > 1)
                {
                    cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
                    istr.clear();
                    istr.ignore(1000, '\n');
                }
                else
                {
                    if (toupper(y_n[0]) == 'Y')
                    {
                        this->flag = true;
                        check = true;
                    }

                    else if (toupper(y_n[0]) == 'N')
                    {
                        this->flag = false;
                        check = true;
                    }

                    else
                    {
                        cout << "Invalid response, only (Y)es or (N)o are acceptable, retry: ";
                        istr.clear();
                        istr.ignore(1000, '\n');
                    }
                }
            }
        }

        return istr;
    }

    ostream& Motorcycle::write(ostream& ostr) const
    {
        if (isEmpty())
        {
            ostr << "Invalid Motorcycle Object"<<endl;
            return ostr;
        }
        else
        {
            Vehicle::write(ostr);

            if (this->isCsv())
            {
                ostr << this->flag << endl;
            }
            else
            {
                if (this->flag == true)
                {
                    ostr << "With Sidecar" << endl;
                }
            }
        }

        return ostr;
    }
}
