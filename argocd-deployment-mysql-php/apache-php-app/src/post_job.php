<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Post a New Job</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        form { background-color: #f9f9f9; padding: 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; }
        label { display: block; margin-bottom: 8px; font-weight: bold; }
        input[type="text"], input[type="email"], textarea {
            width: calc(100% - 22px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        textarea { resize: vertical; min-height: 100px; }
        input[type="submit"] {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
        }
        input[type="submit"]:hover {
            background-color: #45a049;
        }
        .back-link { display: block; margin-top: 20px; text-align: center; }
    </style>
</head>
<body>
    <h1>Post a New Job</h1>

    <form action="process_post.php" method="POST">
        <label for="title">Job Title:</label>
        <input type="text" id="title" name="title" required><br>

        <label for="company">Company:</label>
        <input type="text" id="company" name="company" required><br>

        <label for="location">Location:</label>
        <input type="text" id="location" name="location"><br>

        <label for="description">Job Description:</label>
        <textarea id="description" name="description" required></textarea><br>

        <label for="salary">Salary (optional):</label>
        <input type="text" id="salary" name="salary"><br>

        <label for="email">Contact Email:</label>
        <input type="email" id="email" name="email" required><br>

        <input type="submit" value="Post Job">
    </form>

    <div class="back-link">
        <a href="index.php">Back to Job Listings</a>
    </div>
</body>
</html>