// Name: Festus Osayi
// Seneca Student ID: 170276216
// Seneca email: fosayi@myseneca.ca
// Date of completion: 04-06-2023
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.
#ifndef _SDDS_LINEMANAGER_H_
#define _SDDS_LINEMANAGER_H_
#include <iostream>
#include <string>
#include <vector>
#include "Workstation.h"

namespace sdds{
    class LineManager{
        std::vector<Workstation*> m_activeLine;
        size_t m_cntCustomerOrder{};
        Workstation* m_firstStation{};

        public:
        LineManager() = default;
        LineManager(const std::string& file, const std::vector<Workstation*>& stations);
        void reorderStations();
        bool run(std::ostream& os);
        void display(std::ostream& os) const;
    };
}

#endif //end of an if statement