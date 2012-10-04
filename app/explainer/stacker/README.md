# Newsbound Stacker

This is the core, shared library to be used across Newsbound explainers and briefs.

## To use:

From within a new git repository where you want to include the Stacker application code:

    git submodule add git@github.com:kathrynaaker/stacker.git stacker

Useful info about git submodules:
http://git-scm.com/book/en/Git-Tools-Submodules

## Some tools, the short versions:

server:

    python -m SimpleHTTPServer

sass:

    sass --watch .:.

update spreadsheet:

    ruby stacker/util/export_as_csv.rb



## Tools, the long versions:

### Setup

#### rvm and ruby

* Install rvm
  https://rvm.io/rvm/install/

* Install ruby 1.9.3 through rvm (now with more awesome):

        rvm install 1.9.3 --patch falcon

#### gems

    bundle install

### To Run the webserver:

* Open Terminal.app

* Navigate to the directory using the cd command.
  example:

        cd /Users/kathryn/Projects/newsbound/womensrights

  (You can also drop this project folder onto the Terminal icon in the dock)

* In Terminal, type:

        python -m SimpleHTTPServer

  You should see "Serving HTTP on 0.0.0.0 port 8000 ..."

* Open http://localhost:8000 in your browser.  :-)

* To quit the server, use CTRL+C


### To run the automatic SASS (CSS) compiler:

From terminal, cd to the project directory, then run:

    sass --watch .:.

Can also just update once with:

    sass --update .:.


### To update the google spreadsheet:

From the URL to the spreadsheet, find the key and add it to a file named:
stacker_config.yaml
In the project's root directory.  See example file in stacker/util/

Then run the ruby script:

    ruby stacker/util/export_as_csv.rb



