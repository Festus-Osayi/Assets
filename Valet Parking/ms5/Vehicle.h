/* Final Project Milestone 3
Module: Vehicle
Filename: Vehicle.h
Version 3.0
Author	Festus Osayi
Revision History
-----------------------------------------------------------
Date: 2022/11/26
-----------------------------------------------------------
I have done all the coding by myself and only copied the code
that my professor provided to complete my project milestones.
-----------------------------------------------------------*/

#ifndef SDDS_VEHICLE_H_
#define SDDS_VEHICLE_H_

#include "ReadWritable.h"
#include "Utils.h"

const int MAX_LENGTH = 8;

namespace sdds
{
    class Vehicle : public ReadWritable
    {

        char licensePlate[MAX_LENGTH + 1];
        char *vehicleModel;
        int parkSpot;

    protected:
        void setEmpty();
        bool isEmpty() const;
        const char *getLicensePlate();
        const char *getMakeModel();
        void setMakeModel(const char *makeModel);

    public:
        Vehicle();
        Vehicle(const char *plate, const char *makeModel, int spotNum = 0);
        Vehicle(const Vehicle &copy);
        Vehicle &operator=(const Vehicle &assignment);
        int getParkingSpot() const;
        void setParkingSpot(int spotNum);
        friend bool operator==(Vehicle &v, const char *plate);
        friend bool operator==(Vehicle &v1, Vehicle &v2);
       virtual std::istream &read(std::istream &istr = std::cin);
        virtual std::ostream &writeType(std::ostream &os) const = 0;
       virtual std::ostream &write(std::ostream &ostr = std::cout) const;
        virtual ~Vehicle();
    };

}
#endif //! SDDS_VEHICLE_H_