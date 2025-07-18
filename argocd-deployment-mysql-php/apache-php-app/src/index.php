<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Job Board</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .job-listing { border: 1px solid #ccc; padding: 15px; margin-bottom: 15px; border-radius: 5px; }
        .job-listing h3 { margin-top: 0; }
        .search-form { margin-bottom: 20px; }
        .post-link { display: block; margin-bottom: 20px; }
    </style>
</head>
<body>
    <h1>Job Board</h1>

    <a href="post_job.php" class="post-link">Post a New Job</a>

    <div class="search-form">
        <form action="index.php" method="GET">
            <input type="text" name="search" placeholder="Search by title, company, or location">
            <button type="submit">Search</button>
        </form>
    </div>

    <?php
    include 'db.php';

    $search_query = "";
    if (isset($_GET['search']) && !empty($_GET['search'])) {
        $search_query = $conn->real_escape_string($_GET['search']);
        $sql = "SELECT * FROM jobs WHERE title LIKE '%$search_query%' OR company LIKE '%$search_query%' OR location LIKE '%$search_query%' ORDER BY posted_at DESC";
    } else {
        $sql = "SELECT * FROM jobs ORDER BY posted_at DESC";
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            echo "<div class='job-listing'>";
            echo "<h3>" . htmlspecialchars($row["title"]) . " at " . htmlspecialchars($row["company"]) . "</h3>";
            echo "<p><strong>Location:</strong> " . htmlspecialchars($row["location"]) . "</p>";
            echo "<p><strong>Salary:</strong> " . htmlspecialchars($row["salary"]) . "</p>";
            echo "<p>" . nl2br(htmlspecialchars($row["description"])) . "</p>";
            echo "<p>Contact: <a href='mailto:" . htmlspecialchars($row["email"]) . "'>" . htmlspecialchars($row["email"]) . "</a></p>";
            echo "<p><small>Posted on: " . $row["posted_at"] . "</small></p>";
            echo "</div>";
        }
    } else {
        echo "<p>No jobs found.</p>";
    }

    $conn->close();
    ?>

</body>
</html>