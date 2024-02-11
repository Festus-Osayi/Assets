// Name: Festus Osayi
// Seneca Student ID: 170276216
// Seneca email: fosayi@myseneca.ca
// Date of completion: 3-25-2023
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.

#include <iostream>
#include <iomanip>
#include "CustomerOrder.h"
#include "Utilities.h"

using namespace std;
namespace sdds{
    size_t CustomerOrder::m_widthField{0};
    // a destructor..
    CustomerOrder::~CustomerOrder(){
        for(size_t customerOrder{0}; customerOrder < this->m_cntItem; customerOrder++){
            delete this->m_lstItem[customerOrder];
            
        }
        delete[] m_lstItem;
    }
    
    // a custom 1-argument constructor that takes a reference to an unmodifiable string. This constructor uses a local `Utilities` object to extract the tokens from the string and populate the current instance.
    CustomerOrder::CustomerOrder(const std::string& str){
        size_t start_pos{};
        size_t copy{};
        bool more{true};
        Utilities utilities{};

        this->m_name = utilities.extractToken(str, start_pos, more);
        this->m_product = utilities.extractToken(str, start_pos, more);
        copy = start_pos;

        // count the numbers of items..
        while (more)
        {
            utilities.extractToken(str, start_pos, more);
            this->m_cntItem++;
        }

        start_pos = copy;
        more = true;

        // allocating memory for the array of pointers
        this->m_lstItem = new Item*[m_cntItem];
        for (size_t i = 0; i < m_cntItem; i++) {
            m_lstItem[i] = new Item(utilities.extractToken(str, start_pos, more));
        }

        // Setting the width
        if(m_widthField < utilities.getFieldWidth()){
            m_widthField = utilities.getFieldWidth();
        }
        else{
            m_widthField = m_widthField;
        
        }  
        
    }

    //  The copy constructor should throw an exception if called..
    CustomerOrder::CustomerOrder(const CustomerOrder& error){
        string str{"ERROR! Copy operation not allowed.."};
        throw(str);
    }

    // a move constructor. This constructor should "promise" that it doesn't throw exceptions.
    CustomerOrder::CustomerOrder(CustomerOrder&& order)noexcept {*this = move(order);}

    // a move assignment operator. This operator should "promise" that it doesn't throw exceptions. Use the `noexcept` keyword in the declaration and the definition.
     CustomerOrder&CustomerOrder::operator=(CustomerOrder&& order)noexcept{
        if(this != &order){
            for(size_t item{0}; item < this->m_cntItem; item++){
                // deleting memory any individual items.
                delete this->m_lstItem[item];
            }

            // Deallocating the memory of the item pointers array
            delete[] this->m_lstItem;
            this->m_name = order.m_name;
            order.m_name = "";
            this->m_product = order.m_product;
            order.m_product = "";
            this->m_cntItem = order.m_cntItem;
            order.m_cntItem = 0;
            this->m_lstItem = order.m_lstItem;
            order.m_lstItem = nullptr;
        }

        return *this;
         
    }

    // returns `true` if all the items in the order have been filled; `false` otherwise
    bool CustomerOrder::isOrderFilled() const{
        bool success{true};
        for(size_t orders = 0; orders < this->m_cntItem && success; orders++){
            if(!this->m_lstItem[orders]->m_isFilled){
                success = false;
            }
        }
        return success;
        

    }

    // returns `true` if all items specified by `itemName` have been filled. If the item doesn't exist in the order, this query returns `true`

    bool CustomerOrder::isItemFilled(const std::string& itemName) const{
        bool success{true};
        size_t items {0};;
        while (items < m_cntItem && success) {
            if (m_lstItem[items]->m_itemName == itemName) {
                if (!m_lstItem[items]->m_isFilled) {
                    success = false;
                }
            }
            items++;
        }
        return success;
    }

    // this modifier fills **one** item in the current order that the `Station` specified in the first parameter handles.

    void CustomerOrder::fillItem(Station& station, std::ostream& os){
        bool isFilled { false };
        size_t i = 0;
        while (i < m_cntItem && !isFilled) {
            if ((m_lstItem[i]->m_itemName == station.getItemName()) && !m_lstItem[i]->m_isFilled && (station.getQuantity() > 0)) {

                // Subtracting --> one from the inventory
                station.updateQuantity();
                this->m_lstItem[i]->m_serialNumber = station.getNextSerialNumber();
                this->m_lstItem[i]->m_isFilled = true;
                isFilled = true;
                os << "    Filled " << this->m_name << ", " << m_product << " [" << this->m_lstItem[i]->m_itemName << "]" << endl;
            } else if ((this->m_lstItem[i]->m_itemName == station.getItemName()) && (station.getQuantity() == 0)) {
                os << "    Unable to fill " << this->m_name << ", " << this->m_product << " [" << m_lstItem[i]->m_itemName << "]" << endl;
            }
            i++;
        }
    }

   // this query displays the state of the current object in the format (see the sample output for details)

   void CustomerOrder::display(std::ostream& os) const{
        os << m_name << " - " << m_product << endl;
        for (size_t i = 0; i < m_cntItem; i++) {
            os << "[" << std::right << std::setfill('0') << std::setw(6) << m_lstItem[i]->m_serialNumber << "] ";
            os << std::left << std::setfill(' ') << std::setw(m_widthField) << m_lstItem[i]->m_itemName << "   - " << (m_lstItem[i]->m_isFilled ? "FILLED" : "TO BE FILLED");
            os << std::endl;
        }
    }
}



