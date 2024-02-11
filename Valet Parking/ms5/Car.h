#ifndef _CAR_H_
#define _CAR_H_
#include <iostream>
#define MAX_LICENSE 8
#include "Vehicle.h"
namespace sdds
{

    class Car : public Vehicle
    {
        bool car_wash = false;

    public:
        Car();
        Car(const char *license_plate, const char *car_model);
        Car(const Car &copy);
        Car &operator=(const Car &assignment);
        std::istream &read(std::istream &istr);
        std::ostream &writeType(std::ostream &os) const;
        std::ostream &write(std::ostream &ostr = std::cout) const;
    };
}

#endif // end of an if statement..