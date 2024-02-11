// Name: Festus Osayi
// Seneca Student ID: 170276216
// Seneca email: fosayi@myseneca.ca
// Date of completion: 04-06-2023
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#ifndef _SDDS_WORKSTATION_H_
#define _SDDS_WORKSTATION_H_
#include <iostream>
#include <deque>
#include <string>
#include "CustomerOrder.h"
#include "Station.h"


namespace sdds{
     //-----------------------
    //   Global variables
   //-------------------------
   //holds the orders to be placed onto the assembly line at the first station.
   extern std::deque<CustomerOrder> g_pending;

   //holds the orders that have been removed from the last station and have been completely filled.
   extern std::deque<CustomerOrder> g_completed;

   // holds the orders that have been removed from the last station and could not be filled completely.
   extern std::deque<CustomerOrder> g_incomplete;

    //=========================
   //      Class Definitions
   //==========================
   class Workstation : public Station{
        std::deque<CustomerOrder> m_orders{};
        Workstation * m_pNextStation{};

        public:
        Workstation(){};
        Workstation(const Workstation&) = delete;
        Workstation& operator=(const Workstation&) = delete;
        Workstation(const Workstation&&) = delete;
        Workstation& operator=(const Workstation&&) = delete;
        Workstation(const std::string& str);
        void fill(std::ostream& os);
        bool attemptToMoveOrder();
        void setNextStation(Workstation* station = nullptr);
        Workstation* getNextStation() const;
        void display(std::ostream& os) const;
        Workstation& operator+=(CustomerOrder&& newOrder);

        

   };
}

#endif //end of an if statement..