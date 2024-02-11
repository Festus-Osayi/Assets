// Name: Festus Osayi
// Seneca Student ID: 170276216
// Seneca email: fosayi@myseneca.ca
// Date of completion: 3-25-2023
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.
#ifndef _SDDS_CUSTOMERORDER_H_
#define _SDDS_CUSTOMERORDER_H_
#include "Station.h"
#include <iostream>
#include <string>


namespace sdds{
    struct Item
    {
        std::string m_itemName;
        size_t m_serialNumber{0};
        bool m_isFilled{false};

        Item(const std::string& src) : m_itemName(src) {};
    };

    // class customerOrder..
    class CustomerOrder{
        std::string m_name{};
        std::string m_product{};
        size_t m_cntItem{};
        Item** m_lstItem{};
        static size_t m_widthField;

        public:
        CustomerOrder() = default;
        CustomerOrder(const std::string&);
        // copy semantics
        CustomerOrder(const CustomerOrder&);
        CustomerOrder& operator=(const CustomerOrder& copy) = delete;
        // move semantics
        CustomerOrder& operator=(CustomerOrder&& order)noexcept;
        CustomerOrder(CustomerOrder&& order)noexcept;
        ~CustomerOrder();
        bool isOrderFilled() const;
        bool isItemFilled(const std::string& itemName) const;
        void fillItem(Station& station, std::ostream& os);
        void display(std::ostream& os) const;


    };
}

#endif //end of an if statement