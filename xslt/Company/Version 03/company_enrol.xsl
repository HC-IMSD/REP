<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
<!-- <link rel="stylesheet" type="text/css" href="stylesheet.css"> -->
	<xsl:template match="/">
		<style type="text/css">
			h1{
				font-family: Helvetica,Arial,sans-serif;
				color: black;
			}
			h2
			{
				font-family: Helvetica,Arial,sans-serif;
				font-size: 24px;
				font-weight: 600;
				color: #fff;
			}
			h3
			{
				font-family: Helvetica,Arial,sans-serif;
				display:block;
				font-weight:bold;
				color:black;
			}
			h4
			{
				font-family: Helvetica,Arial,sans-serif;
				display:block;
				font-weight:bold;
				color:black;
			}
			.labels
			{
				display: block;
				
				color:black;
				background-color: inherit;
				font-family: Helvetica, Arial, sans-serif;
				font-weight: bold;
			}
			.company_enrol
			{
				display:block;
				color:black;
				background-color: white;
				border: 1px solid;
				font-family: Helvetica,Arial,sans-serif;
			}
			.panel {
				margin-bottom: 23px;
				background-color: white;
				border: 1px solid transparent;
				border-radius: 4px;
				-webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
				box-shadow: 0 1px 1px rgba(0,0,0,.05);
			}
			.panel-primary {
				border-color: #0C5A9F;
			}
			.panel-primary {
				border-color: #2572b4;
				background-color: white;
			}
			.panel-heading {
				padding: 10px 15px;
				border-bottom: 1px solid transparent;
				border-top-right-radius: 3px;
				border-top-left-radius: 3px;
				background-color: #0C5A9F;
				border-color: #faeacc;
			}
			.panel-title {
				margin-top: 0;
				margin-bottom: 0;
				font-size: 18px;
				color: white;
			}
			.panel-body {
				padding: 15px;
			}
			.panel-warning {
				border-color: #faeacc;
			}
			.panel-warning .panel-heading {
				color: #634615;
				background-color: #fcf8e3;
				border-color: #faeacc;
			}
			.panel-warning .panel-title {
				color: #634615;
				background-color: #fcf8e3;
				border-color: #faeacc;
			}
			.well-sm {
				padding: 9px;
				border-radius: 3px;
			}
			.well {
				height: 50px;
				padding: 10px;
				margin-bottom: 20px;
				background-color: #f5f5f5;
				border: 1px solid #e3e3e3;
				border-radius: 4px;
				-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
				box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
			}
			.form-group {
				margin-bottom: 15px;
			}
			.col-sm-1 {
				width: 5.0%;
				float: left;
				padding: 5px;
			}
			.col-sm-2 {
				width: 8.0%;
				float: left;
				padding: 5px;
			}
			.col-sm-3 {
				width: 21.65%;
				float: left;
				padding: 5px;
			}
			.col-sm-4 {
				width: 22.29%;
				float: left;
				padding: 5px;
			}
			.col-sm-5 {
				width: 24.40%;
				float: left;
				padding: 5px;
			}
			.col-sm-6 {
				width: 27.05%;
				float: left;
				padding: 5px;
			}		
			.col-sm-7 {
				width: 19.42%;
				float: left;
				padding: 5px;
			}
			.col-sm-12 {
				width: 99.4%;
				float: left;
				padding: 5px;
			}
		</style>

		<html>

			<body>
				<xsl:if test="count(COMPANY_ENROL) &gt; 0"> <xsl:apply-templates select="COMPANY_ENROL"></xsl:apply-templates> </xsl:if>
				<!-- <xsl:if test="count(COMPANY_ENROL) &gt; 0"> <xsl:apply-templates select="COMPANY_ENROL"></xsl:apply-templates> </xsl:if> -->
				<!-- <xsl:if test="count(COMPANY_ENROL) &gt; 0"> <xsl:apply-templates select="COMPANY_ENROL"></xsl:apply-templates> </xsl:if> -->
				<!-- <xsl:if test="count(TRANSACTION_ENROL) &gt; 0"> <xsl:apply-templates select="TRANSACTION_ENROL"></xsl:apply-templates> </xsl:if> -->
			</body>
		</html>
	</xsl:template>
	
	<!-- Company Enrolment -->
	<xsl:template match="COMPANY_ENROL">
		<h1>Regulatory Enrolment Process</h1>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Company Enrolment Information</h2>
				</div>
				
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="form-group col-sm-5">
								<span class="labels"> Enrolment Version </span>
								<span class="company_enrol"> <xsl:apply-templates select="enrolment_version" /> </span>
							</div>
							<div class="form-group col-sm-5">
								<span class="labels"> Date Saved </span>
								<span class="company_enrol"> <xsl:apply-templates select="date_saved" /> </span>
							</div>
							<div class="form-group col-sm-5">
								<span class="labels"> Application Type </span>
								<span class="company_enrol"> <xsl:apply-templates select="application_type" /> </span>
							</div>
							<div class="form-group col-sm-5">
								<span class="labels"> Company ID </span>
								<span class="company_enrol"> <xsl:apply-templates select="company_id" /> </span>
							</div>
						</div>
					</div>
					
					<h3> Address Records </h3>
					
					<xsl:for-each select="address_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > Address <xsl:value-of select="position()"/> </h3>
							</header>
							
							
							<div class="panel-body">
								<h4> Company Information </h4>
								<div class="well well-sm">
									<div class="row">
										<div class="form-group col-sm-12">
											<span class="labels"> Company Name [Full Legal Name] </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_name" /> </span>
										</div>
									</div>
								</div>
								
								<h4> Address Information </h4>
								<div class="well well-sm" style="height:120px;">
									<div class="row">
										<div class="form-group col-sm-12">
											<span class="labels"> Street / Suite / P.O. Box </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_address_details/street_address" /> </span>
										</div>
									</div>
									<div class="row">
										<div class="form-group col-sm-4">
											<span class="labels"> City / Town </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_address_details/city" /> </span>
										</div>
										<div class="form-group col-sm-4">
											<span class="labels"> Province </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_address_details/province_text" /> </span>
										</div>
										<div class="form-group col-sm-4">
											<span class="labels"> Country </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_address_details/country" /> </span>
										</div>
										<div class="form-group col-sm-4">
											<span class="labels"> Postal / ZIP Code </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_address_details/postal_code" /> </span>
										</div>
										<div class="form-group col-sm-2">
											<span class="labels"> Amended Record? </span>
											<span class="company_enrol"> <xsl:apply-templates select="amend_record" /> </span>
										</div>
									</div>
								</div>
								
								<h4> Roles </h4>
								<div class="well well-sm">
									<div class="row">
										<span class="labels"> Types </span>
										<xsl:if test="manufacturer = 'Y'">
											<div class="form-group col-sm-5" >
												<span class="company_enrol"> Manufacturer/Sponsor Address </span>
											</div>
										</xsl:if>
										<xsl:if test="mailing = 'Y'">
											<div class="form-group col-sm-5" >
												<span class="company_enrol"> Mailing Address </span>
											</div>
										</xsl:if>
										<xsl:if test="billing = 'Y'">
											<div class="form-group col-sm-5" >
												<span class="company_enrol"> Billing Address </span>
											</div>
										</xsl:if>
										<xsl:if test="importer = 'Y'">
											<div class="form-group col-sm-5" >
												<span class="company_enrol"> Canadian Importer Address </span>
											</div>
										</xsl:if>
									</div>
								</div>
							</div>
						</div>												
					</xsl:for-each>
					
					<h3> Contact Records </h3>
					
					<xsl:for-each select="contact_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > Contact <xsl:value-of select="position()"/> </h3>
							</header>
							
							<div class="panel-body">
								<h4> Company Representative Information </h4>
								<div class="well well-sm" style="height:120px;">
									<div class="row">
										<div class="form-group col-sm-1">
											<span class="labels"> Salutation </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/salutation" /> </span>
										</div>
										<div class="form-group col-sm-3">
											<span class="labels"> Given Name </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/given_name" /> </span>
										</div>
										<div class="form-group col-sm-1">
											<span class="labels"> Initials </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/initials" /> </span>
										</div>
										<div class="form-group col-sm-3">
											<span class="labels"> Surname </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/surname" /> </span>
										</div>
										<div class="form-group col-sm-3">
											<span class="labels"> Job Title </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/job_title" /> </span>
										</div>
										<div class="form-group col-sm-3">
											<span class="labels"> Language Correspondence </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/language_correspondance" /> </span>
										</div>
									</div>
									<div class="row">
										<div class="form-group col-sm-6">
											<span class="labels"> Phone Number </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/phone_num" /> </span>
										</div>
										<div class="form-group col-sm-2">
											<span class="labels"> Phone Extension </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/phone_ext" /> </span>
										</div>
										<div class="form-group col-sm-6">
											<span class="labels"> Fax Number </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/fax_num" /> </span>
										</div>
										<div class="form-group col-sm-6">
											<span class="labels"> Email </span>
											<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/email" /> </span>
										</div>
										<div class="form-group col-sm-2">
											<span class="labels"> Amended Record? </span>
											<span class="company_enrol"> <xsl:apply-templates select="amend_record" /> </span>
										</div>
									</div>
								</div>
								
								<h4> Roles </h4>
								<div class="well well-sm">
									<div class="row">
										<span class="labels"> Types </span>
										<xsl:if test="manufacturer = 'Y'">
											<div class="form-group col-sm-7" >
												<span class="company_enrol"> Manufacturer/Sponsor Contact </span>
											</div>
										</xsl:if>
										<xsl:if test="mailing = 'Y'">
											<div class="form-group col-sm-7" >
												<span class="company_enrol"> Mailing Contact </span>
											</div>
										</xsl:if>
										<xsl:if test="billing = 'Y'">
											<div class="form-group col-sm-7" >
												<span class="company_enrol"> Billing Contact </span>
											</div>
										</xsl:if>
										<xsl:if test="importer = 'Y'">
											<div class="form-group col-sm-7" >
												<span class="company_enrol"> Canadian Importer Contact </span>
											</div>
										</xsl:if>
										<xsl:if test="rep_contact_role = 'PRIMARY'">
											<div class="form-group col-sm-7" >
												<span class="company_enrol"> REP Primary Contact </span>
											</div>
										</xsl:if>
										<xsl:if test="rep_contact_role = 'SECONDARY'">
											<div class="form-group col-sm-7" >
												<span class="company_enrol"> REP Secondary Contact </span>
											</div>
										</xsl:if>
									</div>
								</div>
							</div>
						</div>
					</xsl:for-each>
				</div>		
			</div>
		</section>
	</xsl:template>
</xsl:stylesheet>