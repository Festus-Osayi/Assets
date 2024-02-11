#ifndef _MOTORCYCYLE_H_
#define _MOTORCYCLE_H_
#include <iostream>
#include "Vehicle.h"

namespace sdds
{

    class Motorcycle : public Vehicle
    {
        bool flag = false;

    public:
        Motorcycle();
        Motorcycle(const char *license_plate, const char *make_model);
        Motorcycle(const Motorcycle &copy);
        Motorcycle &operator=(const Motorcycle &assignment);
        virtual std::ostream &writeType(std::ostream &os) const;
        std::istream &read(std::istream &istr);
        std::ostream &write(std::ostream &ostr);
    };
}

#endif