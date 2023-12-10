# Sustainify

Sustainify is a browser extension that captures web pages and leverages a Natural Language Processing (NLP) model for Part-of-Speech (POS) tagging and text similarity analysis. The extension aids users in finding sustainable alternatives to various items, displaying their carbon footprints and intensity.

## Overview

### Features

1. **Web Page Capture:**
   - Clicking the extension icon captures the current web page.

2. **NLP Model:**
   - Utilizes an NLP model for POS tagging and text similarity analysis.

3. **Search Functionality:**
   - Allows users to search for items (e.g., bottle, chair, table, coffee mug).

4. **Sustainable Results:**
   - Displays sustainable alternatives to the searched item.

5. **Carbon Footprint:**
   - Shows carbon footprint and intensity of the searched item.

6. **Eco-friendly Alternatives:**
   - Lists eco-friendly alternatives along with their carbon footprints.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/haruheero/Sustainify.git
   ```

2. Install dependencies:
   ```bash
   cd Sustainify
   ```
   2.1 Run backend
   ```bash
   python3 Apis.py
   ```
   2.2 Run frontend
   ```bash
   cd frontend
   npm i
   npm start
   ```

4. Load the extension in your browser:
   - Follow browser-specific instructions for loading unpacked extensions.

## Usage

1. **Capturing Web Pages:**
   - Click the extension icon to capture the current web page.

2. **Searching for Items:**
   - Use the search functionality to find information on items like bottle, chair, table, etc.

3. **Viewing Results:**
   - Sustainable alternatives and their carbon footprints are displayed.

## Tech Stack
1. Python
2. React.js
3. Javascript
