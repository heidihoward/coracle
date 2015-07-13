# Coracle ![coracle Clipart courtesy FCIT](https://cloud.githubusercontent.com/assets/1835251/8544604/8d3fdee6-249e-11e5-8ae3-0ee6d73028dd.png) 

Welcome to Coracle, a consensus algorithm simulator for heterogeneous networks.

______

#### Installation

An install script can be found in [scripts/install.sh](scripts/install.sh). The general process is as follows:

Start off by installing OPAM/OCaml, here's some helpful links:
* https://opam.ocaml.org/doc/Install.html
* https://github.com/realworldocaml/book/wiki/Installation-Instructions

Using OPAM we can get the project dependencies:
```
opam update
opam upgrade
opam install cstruct ipaddr lwt sexplib cmdline
```

And then compile from source as follows:

```
git clone https://github.com/heidi-ann/coracle
cd coracle

ocaml setup.ml -configure
ocaml setup.ml -build
ocaml setup.ml -install
```

______

#### Usage

We currently support two interfaces: command line implementation and simulation.

##### Implementation

Run an consensus algorithm as follows:
```
./coracle_unix.byte 1 --max=5
```
This instance will bind locally to port 5001 (5000+id) and will try to communicate with other instances at ports 5000 to 5004 (5000 to 5000+max-1).

##### Simulation

Ran a simulation as follows:
```
./coracle_sim.byte -n 5
```
This will ran a simualator with 5 nodes.

##### Bugs

Please send any comments, questions or bugs to GitHub issue tracker:

https://github.com/heidi-ann/coracle/issues

##### License

This code is released under the MIT License, see the [LICENSE](LICENSE) file for full details.

Coracle clipart courtesy of [FCIT](http://etc.usf.edu/clipart/) for non-commercial use only 
______

#### Contribute

This project is in the early development stages and we plan to have the first prototype release ready for [SIGCOMM '15](http://conferences.sigcomm.org/sigcomm/2015/) on 17th Aug 2015. Contributions are welcome, these are best make via pull requests and using Github issues to mark that your working on a particular issues or features. 

The current codebase is structured as follows:

* [lib/](lib) - common functionality used by all consensus implementations
  * [common.ml(i)](lib/common.ml) - simple useful functions for use throughout
  * [io.ml(i)](lib/io.ml) - type definitions for protocol and frontend interface
  * [numbergen.ml(i)](lib/numbergen.ml) - generator for random numbers within a given distribution
  * [protocol.ml(i)](lib/protocol.ml) - module sig for general consensus algorithms
* [raft/](raft) - pure raft consensus implementation
  * [election.ml(i)](raft/election.ml) - raft election code
  * [election_io.ml(i)](raft/election.ml) - raft election interface, packets and timeouts
  * [event.ml(i)](raft/event.ml) - main eval loop for raft protocol
  * [raft.ml(i)](raft/raft.ml) - wrapping raft consensus ready for the CONSENSUS sig
  * [rpcs.ml(i)](raft/rpcs.ml) - raft RPC representations as records plus serialize/deserialize
  * [state.ml(i)](raft/state.ml) - raft internal state and operators
* [unix/](unix) - unix frontend for consensus protocols
  * [client.ml(i)](unix\client.ml) - empty
  * [coracle_unix.ml(i)](unix/coracle_unix.ml) - parsing command line arguments for unix interface
  * [id.ml(i)](unix/id.ml) - handling node ID's
  * [io_handlers.ml(i)](unix/io_handlers.ml) - main body of unix interface
* [sim/](sim) - simulation frontend for coracle
  * [coracle_sim.ml(i)](sim/coracle_sim.ml) - parsing command line arguments for simulation interface
  * [events.ml(i)](sim/events.ml) - handling events and their applications
  * [parameters.ml(i)](sim/parameters.ml) - type sig for simulation parameters
  * [simulator.ml(i)](sim/simulator.ml) - simulators main loop
  * [states.ml(i)](sim/states.ml) - handling multiple node state
* [scripts/](scripts) deployment scripts for demo server
  * [install.sh](scripts/install.sh) - script to install coracle on demo server
  * [update.sh](scripts/update.sh) -  script to pull code/library updates
* [_oasis](_oasis) - configuration file for the [OASIS](http://oasis.forge.ocamlcore.org/) build system
* [_tags](_tags), [myocamlbuild.ml](myocamlbuild.ml), [setup.ml](setup.ml) - files auto generated by OASIS, included so that OASIS is not a project dependency
* META, *.mlylib, *.mllib, *.mlpack - files auto generated by OASIS during packing


#### ToDos

##### Common backend
- [x] Abstract over Consensus algorithms

##### Raft
- [ ] Support AppendEntries
- [ ] Support Client Interation
- [ ] Support for Read-only Comamnds 

##### VRR
- [ ] Implement VRR 

##### Simulation frontend (OCaml)
- [ ] Parsing simulation config in JSON
- [ ] Terminating simulation at specified time
- [ ] Ability to store and query hetrozengous networks, later labelled with parameters like node failure rates, link direction, link latency, probability of packet loss, bandwidth etc..
- [ ] Allow simulated/random/uniform client workloads

##### Simulation frontend (JS)
- [ ] Simple prototype JS frontend
  - [ ] user selectes between raft and vrr, number of nodes, number of secs to simulate and main timeout parameter
  - [ ] intermediate service runs OCaml simulator process with parameters expressed in JSON
  - [ ] OCaml simulator process terminates returning simulation stats in JSON
  - [ ] stats are displayed to the user
- [ ] Allow the user to select between a set of sample network topologies
- [ ] Allow the user to draw static network topologies and label it
- [ ] Allow the user to run multi simulations at once
- [ ] Return results as graphs instead of just a table of stats

##### Unix frontend
- [ ] Decople server id and port/host address
- [ ] Support for config files, with a subset of [logcabin's options](https://github.com/logcabin/logcabin/blob/master/sample.conf).
- [ ] Support for state machines as a seperate process (or even on an separate host), comms via sockets/pipes/ other IPCs
- [ ] Proper client side executable with suuport for an application as a separate process
- [ ] Really support for persistent storage, with write-ahead logging

##### Admin \& Housekeeping
- [ ] Adding Travis-CI support
- [ ] Choose and implement a logging solution throughout code base, syslog compatible
- [ ] add coracle to OPAM
- [ ] add copyright/license notice to each file header
- [ ] add ocaml 4.02.2 support (fix inconsistent interface error)

##### Demo
- [ ] Register coracle domain
- [ ] Setup Coracle on Azure, may need multiple machines/processes with load balancing

______

#### Ideas for future features

- [ ] Support for other consensus protocols such as original Paxos, Zab or EPaxos
- [ ] Dynamic membership implementation for Raft and VRR plus abiliy to test in simulation
- [ ] MirageOS frontend 
- [ ] Complete JS implementation using js_of_ocaml
- [ ] Support for non-ocaml consensus protocols
- [ ] Support for simulating dynamic network topologies
- [ ] Split this code into 3 or 4 seperate repositories 

