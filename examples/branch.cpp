#include <iostream>

int main() {
    int left;
    int right;
    std::cin >> left >> right;

    if (left > right) {
        std::cout << "left > right\n";
    } else if (left < right) {
        std::cout << "left < right\n";
    } else {
        std::cout << "left == right\n";
    }
}
