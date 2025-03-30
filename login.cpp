#include <iostream>
#include <fstream>
#include <string>

using namespace std;

int main() {
    string email, password, storedEmail, storedPassword;
    
    // Read user input (simulating form submission)
    cout << "Content-Type: text/html\n\n";
    cin >> email >> password;

    ifstream file("users.txt");
    bool valid = false;

    while (file >> storedEmail >> storedPassword) {
        if (email == storedEmail && password == storedPassword) {
            valid = true;
            break;
        }
    }
    file.close();

    if (valid) {
        cout << "<html><body><h2>Login Successful</h2></body></html>";
    } else {
        cout << "<html><body><h2>Invalid Credentials</h2></body></html>";
    }
    
    return 0;
}
