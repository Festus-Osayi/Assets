// Name: Festus Osayi
// Seneca Student ID: 170276216
// Seneca email: fosayi@myseneca.ca
// Date of completion: 04-06-2023
//
// I confirm that I am the only author of this file
//   and the content was created entirely by me.
#include <iostream>
#include <iomanip>
#include "LineManager.h"
#include <algorithm>
#include <fstream>
#include "Utilities.h"
using namespace std;

namespace sdds{

    // this constructor receives the name of the file that identifies the active stations on the assembly line (example: `AssemblyLine.txt`) and the collection of workstations available for configuring the assembly line.

        LineManager::LineManager(const std::string& file, const std::vector<Workstation*>& stations){
            ifstream input(file);

            if(!input.is_open()){
                cerr<<"Unable to read or open from file";
            }

            Utilities utilities{};
            string str{};
            size_t start_pos { 0 };
            size_t copy{start_pos};
            bool more { true };

            //vectors to determine the first station later in the code
            std::vector<std::string> firstStations;
            std::vector<std::string> lastStations;

            while(getline(input, str)){

                // reseting the givev indexex
            start_pos = copy;
            std::string currentStation {}, 
            temp_nstation {};
            currentStation = utilities.extractToken(str, start_pos, more);
            // to prevent the program from extracting twice if no delimiter. 
            // Additionally, checking to see if there is any next station that exists
            if (!(start_pos == copy)) {
                temp_nstation = utilities.extractToken(str, start_pos, more);

                // Adding the stations to our vectors
                firstStations.push_back(currentStation);
                lastStations.push_back(temp_nstation);
            }
            // Finding the current station in the collection
            auto currStation = std::find_if(stations.begin(), stations.end(), [&](Workstation* station){
                return station->getItemName() == currentStation;
            });
            // Adding the station to the active line
            this->m_activeLine.push_back(*currStation);

            // looking for the next station in the collection
            if (temp_nstation.length() > 0) {
                auto nextStation = std::find_if(stations.begin(), stations.end(), [&](Workstation* station){
                    return station->getItemName() == temp_nstation;
                });
                // Setting the next station
                (*currStation)->setNextStation(*nextStation);
            }
        }

        //logic in determining the first station
        size_t cnt {};
        std::string checkForFirstStation {};
        for (const auto & leftStation : firstStations) {
            cnt = 0;
            for (const auto & rightStation : lastStations) {
                if (leftStation == rightStation) {
                    cnt++;
                }
            }
            if (cnt == 0) {
                checkForFirstStation = leftStation;
                break;
            }
        }

        // Setting the frist given station
        auto firstStation = std::find_if(stations.begin(), stations.end(), [&](Workstation* station){
            return station->getItemName() == checkForFirstStation;
        });
        m_firstStation = (*firstStation);

        
        this->m_cntCustomerOrder = g_pending.size();
    }

    //this modifier reorders the workstations present in the instance variable `m_activeLine` (loaded by the constructor) and stores the reordered          collection in the same instance variable. 
    void LineManager::reorderStations() {
        std::vector<Workstation*> reOrder;
        Workstation* currentStation = m_firstStation;
        while (currentStation != nullptr) {
            reOrder.push_back(currentStation);
            currentStation = currentStation->getNextStation();
        }
        m_activeLine = reOrder;
    }

    // Performs one iteration of operations on all the workstations in the current assembly line
    bool LineManager::run(std::ostream& os) {
        static size_t ite{0};
        os << "Line Manager Iteration: " << (ite = ite + 1) << std::endl;

        if (!g_pending.empty()) {
            *m_firstStation += std::move(g_pending.front());
            g_pending.pop_front();
        }

        std::for_each(this->m_activeLine.begin(),this->m_activeLine.end(), [&os](Workstation* ws){
            ws->fill(os);
        });
        std::for_each(this->m_activeLine.begin(),this->m_activeLine.end(), [](Workstation* ws){
            ws->attemptToMoveOrder();
        });

        return m_cntCustomerOrder == (g_completed.size() + g_incomplete.size());
    }

    // Displays all active stations on the assembly line in their current order
    void LineManager::display(std::ostream& os) const {
        std::for_each(m_activeLine.begin(), m_activeLine.end(), [&os](Workstation* station){
            station->display(os);
        });
    }
}
