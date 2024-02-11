#ifndef _VEHICLE_H_
#define _VEHICLE_H_
#include <iostream>
#include "ReadWritable.h"
#define MAX_LICENSE 8
#define MAX_MODEL 60

namespace sdds {
    class Vehicle : public ReadWritable {
        char licensePlate[MAX_LICENSE + 1];
        char* vehicleModel;
        unsigned int parkingSpot{};
    public:
        Vehicle();
        ~Vehicle();
        Vehicle(const char* licensePlate, const char* model);
        void setEmpty();
        Vehicle(const Vehicle& copy);
        Vehicle& operator=(const Vehicle& assignment);
        bool isEmpty()const;
        const char* getLicensePlate()const;
        const char* getMakeModel()const;
        void setMakeModel(const char* makeModel);
        int getParkingSpot()const;
        void setParkingSpot(int parking_spot);
        bool operator==(const char* license_value)const;
        bool operator==(const Vehicle& license)const;
        std::istream& read(std::istream& istr);
        std::ostream& write(std::ostream& ostr)const;
        virtual std::ostream& writeType(std::ostream& os)const = 0;
        void toUpper(char* upper_case)const;
    };
}



#endif //end of an if statement..