# konami

### Include the following HTML, edit what you want to execute, and that's it!

    <!-- JS Links -->
    <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
    <script src="konami.js" type="text/javascript" charset="utf-8"></script>

### Efficient keystroke checking
Instead of checking if the last keystrokes matched the entire code, konami.js only stores and checks the first 3 keys of the code. If the first 3 keys match, it allows the script to continue and listen for the rest of the sequence.
