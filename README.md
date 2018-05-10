# Humans-V-Zombies-Simulation
Intro
This simulation is a project that was completed by Zane Reeder under Dr. Brock Williams of the Texas Tech University Math Department.

The intention of this project was to create a basic representation of the popular college outdoor game Humans vs Zombies. Therefore, Zane used the rules of the game as given by the official website and the commonly known ficitonal Zombie during design the simulation.

Behind the Scenes
There are some features of the simulation that are not clearly laid out in the above editable parameters.

If an element is set outside the given parameters by the user, then when the simulation is started that element will revert back to the default set parameter value.

If more than one weapon is chosen, the simulation will provide as close to an equal amount of each type of weapon as possible. This is done by the following: Let h be the number of humans in simulation and i be the human id number. Let n be the number of weapons selected. Then the program will provide weapon1 if i%n=0, weapon2 if i%n=1 and so on.

If the "Stop Current Simulation" button is not clicked before running a new simulation there is a possiblity of previous simulation elements interfering with elements of the current simulation. This is due to the simulation loop of the program. The "Stop Current Simulation" button will cause the program to exit the simulation loop and delete the current simulation object.

Engineering
The simulation is entirely written in JavaScript using close to a modular architectural design. This specific design was used to ensure hidden objects so that outside interferance was very complicated if not impossible while the simulation is running. The simulation is displayed through the use of the HTML5 canvas element.

Final Thoughts
The simulation is very enjoyable to play around with. There are many features and parameters Zane expects to implement in the future as a side project. These future elements would include a user set time limit to ensure a human victory, a zombie death possibility, a custom weapon builder option, and more.
