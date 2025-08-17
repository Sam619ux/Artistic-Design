<?php
// Retrieve form data
$name = $_POST['name'];
$password = $_POST['password'];

// Check if any field is empty
if (!empty($name) && !empty($password)) {
    // Database connection details
    $host = "localhost";
    $dbusername = "root";
    $dbpassword = "";
    $dbname = "prototype";

    // Create connection
    $conn = new mysqli($host, $dbusername, $dbpassword, $dbname);

    // Check for connection errors
    if (mysqli_connect_error()) {
        die('Connect Error (' . mysqli_connect_errno() . ') ' . mysqli_connect_error());
    } else {
        // SQL query to check if the phone number already exists
        $SELECT = "SELECT password FROM reg WHERE password = ? LIMIT 1";
        
        // Prepare and execute the SELECT statement
        $stmt = $conn->prepare($SELECT);
        $stmt->bind_param("s", $password);
        $stmt->execute();
        $stmt->store_result();
        $rnum = $stmt->num_rows;

        // Checking if the phone number is already registered
        if ($rnum == 0) {
            $stmt->close();

            // SQL query to insert the form data
            $INSERT = "INSERT INTO reg (name,password) VALUES (?, ?)";
            
            // Prepare and execute the INSERT statement
            $stmt = $conn->prepare($INSERT);
            $stmt->bind_param("ss", $name, $password);
            $stmt->execute();

            // Display success message
            echo '<div style="text-align:center; font-weight:bold; color:green;">you are not registered</div>';
        } else {
            // Display error message if phone number is already registered
            header("Location:http://localhost/ArtisticDesignfinal/");
 
            echo '<div style="text-align:center; font-weight:bold; color:red; margin-bottom: 10px;">welcome back</div>';
            echo '<div style="text-align:center;"><button onclick="redirectToInterestForm()">OK</button></div>';
        }

        // Close the statement and the connection
        $stmt->close();
        $conn->close();
    }
} else {
    // Display error message if any field is empty
    echo '<div style="text-align:center; font-weight:bold; color:red;">All fields are required</div>';
    echo '<div style="text-align:center; margin-top: 10px;"><button onclick="redirectToappointment()">OK</button></div>';
    die();
}
?>

<!-- JavaScript function to redirect to the homepage -->
<script>
    function redirectToappointment() {
        window.location.href = 'index.html';
    }
</script>