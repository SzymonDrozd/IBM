<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<%@ taglib prefix="th" uri="http://www.springframework.org/tags/form"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
<meta name="description" content="">
<meta name="author" content="">

<!-- Latest compiled and minified CSS -->
<link rel="stylesheet"
	href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<!-- jQuery library -->
<script
	src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<!-- Latest compiled JavaScript -->
<script
	src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<title>Registration page</title>

<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
</head>

<body>

	<div class="container">

		<div class="row">
			<div class="col-xs-12">
				<h2 class="text-center">Register</h2>
			</div>
		</div>

		<form:form method="POST" action="/registration" modelAttribute="user">

			<div class="form-group">
				<form:input path="email" name="email" type="email"
					class="form-control" autofocus="true" placeholder="Email address" />
				<form:errors path="email" />
			</div>
			<div class="form-group">
				<form:input path="password" name="password" type="password"
					class="form-control" autofocus="true" placeholder="Password" />
				<form:errors path="password" />
			</div>

			<div class="form-group">
				<form:input path="confirmPassword" name="confirmPassword"
					type="password" class="form-control" autofocus="true"
					placeholder="Password (confirmation)" />
				<form:errors path="confirmPassword" />
			</div>
			<div class="form-group">
				<form:input path="firstName" name="firstName" type="text"
					class="form-control" autofocus="true" placeholder="First Name" />
				<form:errors path="firstName" />
			</div>

			<div class="form-group">
				<form:input path="surname" name="surname" type="text"
					class="form-control" autofocus="true" placeholder="Surname" />
				<form:errors path="surname" />
			</div>
			<div class="form-group">
				<form:select path="status" name="status" type="text">
					<option value="student">student</option>
					<option value="teacher">teacher</option>
				</form:select>
			</div>
			<div class="form-group">
				<button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
			</div>
		</form:form>

	</div>
	<script
		src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
	<script src="${contextPath}/resources/js/bootstrap.min.js"></script>
</body>
</html>