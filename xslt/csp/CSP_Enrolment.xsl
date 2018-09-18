<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:template match="/">

		<html>
		<style type="text/css">
			html {
            height: auto !important;
            }
            body{
            height: auto !important;
            }
            h1{
            font-family: Helvetica,Arial,sans-serif;
            color: black;
            }
            h2
            {
            font-family: Helvetica,Arial,sans-serif;
            font-size: 24;
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
            height: auto;
            word-wrap: break-word;
            }
			.dossier_enrol
            {
            display:block;
            color:black;
            background-color: white;
            border: 1px solid;
            font-family: Helvetica,Arial,sans-serif;
            height: auto;
            word-wrap: break-word;
            }
			.activity_enrol
            {
            display:block;
            color:black;
            background-color: white;
            border: 1px solid;
            font-family: Helvetica,Arial,sans-serif;
            height: auto;
            word-wrap: break-word;
            }
			.transaction_enrol
            {
            display:block;
            color:black;
            background-color: white;
            border: 1px solid;
            font-family: Helvetica,Arial,sans-serif;
            height: auto;
            word-wrap: break-word;
            }
            .row{
            overflow:hidden;
            text-overflow:ellipsis;
            }
            .panel {
            margin-bottom: 0.65%;
            background-color: white;
            border: 1px solid transparent;
            border-radius: 4px;
            -webkit-box-shadow: 0 1px 1px rgba(0,0,0,.05);
            box-shadow: 0 1px 1px rgba(0,0,0,.05);
            height: auto;
            display: block;
            float: left;
            width: 100%;
            }
            .panel-primary {
            border-color: #2572b4;
            }
            .panel-primary {
            border-color: #2572b4;
            background-color: white;
            }
            .panel-heading {
            padding: 0.50% 0.75%;
            border-bottom: 1px solid transparent;
            border-top-right-radius: 3px;
            border-top-left-radius: 3px;
            background-color: #2572b4;
            border-color: #faeacc;
            }
            .panel-title {
            margin-top: 0;
            margin-bottom: 0;
            font-size: 20;
            color: white;
            }
            .panel-body {
            padding: 0.75%;
            display: block;
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
            .panel-warning .panel-body {
            padding: 0.75%;
            height: auto;
            display: block;
            }
            .well-sm {
            border-radius: 0.15%;
            }
            .well {
            float: left;
            width: 98.8%;
            padding: 0.50%;
            margin-bottom: 0.25%;
            background-color: #f5f5f5;
            border: 1px solid #e3e3e3;
            border-radius: 4px;
            -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
            box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
            }
            .col-sm-005 {
            width: 5.0%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-008 {
            width: 8.0%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-012 {
            width: 12.3%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-016 {
            width: 16.10%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-019 {
            width: 19.42%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-021 {
            width: 21.65%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-022 {
            width: 22.29%;
            float: left;
           padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-023 {
            width: 23.70%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-024 {
            width: 24.43%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-027 {
            width: 27.20%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-032 {
            width: 32.77%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-035 {
            width: 35.60%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-036 {
            width: 36.68%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-049 {
            width: 49.4%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-074 {
            width: 74.50%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-065 {
            width: 65%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
			.col-sm-097 {
            width: 97.4%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
            .col-sm-099 {
            width: 99.4%;
            float: left;
            padding: 0.25%;
            margin-bottom: 0.125%;
            }
		</style>
			<body>
				<xsl:if test="count(CERTIFICATE_SUPPLEMENTARY_PROTECTION) &gt; 0"> <xsl:apply-templates select="CERTIFICATE_SUPPLEMENTARY_PROTECTION"></xsl:apply-templates></xsl:if>
			</body>
		</html>
	</xsl:template>
	<xsl:template match="CERTIFICATE_SUPPLEMENTARY_PROTECTION">
	<h1>Certificate of Supplementary Protection (CSP) Application Form</h1>
	<section>
		<div class="panel panel-primary">
			<div class="panel-heading">
				<h2 class="panel-title">Health Canada Use Only</h2>
			</div>
			<div class="panel-body">
				<div class="well well-sm" >
					<div class="row">
						<div class="col-sm-032">
							<span class="labels"> Date Application Received </span>
							<span class="company_enrol"> <xsl:apply-templates select="health_canada_only/date_received" /> </span>
						</div>
						<div class="col-sm-032">
							<span class="labels"> CSP Company Code </span>
							<span class="company_enrol"> <xsl:apply-templates select="health_canada_only/company_id" /> </span>
						</div>
						<div class="col-sm-032">
							<span class="labels"> CSP Application Number </span>
							<span class="company_enrol"> <xsl:apply-templates select="health_canada_only/application_id" /> </span>
						</div>
						<div class="col-sm-099">
							<span class="labels"> Notes </span>
							<pre style="font-size:1em;"><span style="padding:2px;" class="company_enrol">
								<xsl:apply-templates select="health_canada_only/hc_notes" />
						</span>
					</pre>
				</div>
			</div>
		</div>
				<br/>
				<br/>
	</div>
</div>
			<br/>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Certificate of Supplementary Protection (CSP) Information</h2>
				</div>
					<div class="panel-body">
						<div class="well well-sm">
							<div class="row">
							<div class="col-sm-012">
								<span class="labels"> Enrolment Version </span>
								<span class="company_enrol"> <xsl:apply-templates select="enrolment_version" /> </span>
							</div>
							<div class="col-sm-012">
								<span class="labels"> Date Last Saved </span>
								<span class="company_enrol"> <xsl:apply-templates select="date_saved" /> </span>
							</div>
						</div>
					</div>
						<br/>
						<br/>
						<br/>
						<div class="panel-body">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading">
							<h2 class="panel-warning panel-title">1. Applicant Information </h2>
						</header>

						<div class="panel-warning panel-body">
								<div class="col-sm-099">
										<div class="well well-sm" >
												<div class="row">
														<div class="col-sm-099">
																<span class="labels"> Applicant name </span>
																	<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/applicant_name)[1]"/></xsl:call-template></span>
														</div>
												</div>
												<div class="row">
														<div class="col-sm-008">
																<span class="labels"> Salutation </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/salutation)[1]"/></xsl:call-template></span>

														</div>
														<div class="col-sm-016">
																<span class="labels"> First Name </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/given_name)[1]"/></xsl:call-template></span>
														</div>
														<div class="col-sm-005">
																<span class="labels"> Initials </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/initials)[1]"/></xsl:call-template></span>
														</div>
														<div class="col-sm-016">
																<span class="labels"> Last Name </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/surname)[1]"/></xsl:call-template></span>
														</div>
														<div class="col-sm-021">
																<span class="labels">Language of Correspondence</span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/language_correspondance)[1]"/></xsl:call-template></span>
														</div>
												</div>
												<div class="row">
														<div class="col-sm-024">
																<span class="labels"> Job Title </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/job_title)[1]"/></xsl:call-template></span>
														</div>

														<div class="col-sm-012">
																<span class="labels"> Fax Number </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/fax_num)[1]"/></xsl:call-template></span>
														</div>
														<div class="col-sm-012">
																<span class="labels"> Phone Number </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/phone_num)[1]"/></xsl:call-template></span>
														</div>
														<div class="col-sm-012">
																<span class="labels"> Phone Extension </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/phone_ext)[1]"/></xsl:call-template></span>
														</div>

														<div class="col-sm-035">
																<span class="labels"> Email </span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/email)[1]"/></xsl:call-template></span>
														</div>
												</div>
												<div class="row">
													<div class="col-sm-024">
														<span class="labels"> Street Address </span>
														<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/street_address)[1]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-016">
														<span class="labels"> City or Town </span>
														<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/city)[1]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-016">
														<span class="labels"> Country </span>
														<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/country/@label_en)[1]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-024">
														<span class="labels"> Province </span>
														<span class="company_enrol">
															<xsl:if test="((applicant/address/province_lov)[1]) != ''">
															<xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/province_lov)[1]"/></xsl:call-template>
														</xsl:if>
														<xsl:if test="((applicant/address/province_lov)[1]) = ''">
															<xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/province_text)[1]"/></xsl:call-template>
														</xsl:if>
														</span>
													</div>
													<div class="col-sm-016">
														<span class="labels"> Postal Code </span>
														<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/postal_code)[1]"/></xsl:call-template></span>
													</div>
												</div>
										</div>
								</div>
						</div>
					</div>
					<xsl:if test="(applicant/billing_role)[2] ='Y'">
					<div class="panel panel-warning">
						<header class="panel-warning panel-heading">
						<h2 class="panel-warning panel-title"> Billing Information </h2>
					</header>

					<div class="panel-warning panel-body">
							<div class="col-sm-099">
									<div class="well well-sm" >
											<div class="row">
													<div class="col-sm-027">
															<span class="labels">Company name (Full legal Name - no abbreviations)</span>
																<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/applicant_name)[2]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-008">
															<span class="labels"> Salutation </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/salutation)[2]"/></xsl:call-template></span>

													</div>
													<div class="col-sm-016">
															<span class="labels"> First Name </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/given_name)[2]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-005">
															<span class="labels"> Initials </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/initials)[2]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-016">
															<span class="labels"> Last Name </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/surname)[2]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-021">
															<span class="labels"> Language of Correspondence </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/language_correspondance)[2]"/></xsl:call-template></span>
													</div>
											</div>
											<div class="row">
													<div class="col-sm-024">
															<span class="labels"> Job Title </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/job_title)[2]"/></xsl:call-template></span>
													</div>

													<div class="col-sm-012">
															<span class="labels"> Fax Number </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/fax_num)[2]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-012">
															<span class="labels"> Phone Number </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/phone_num)[2]"/></xsl:call-template></span>
													</div>
													<div class="col-sm-012">
															<span class="labels"> Phone Extension </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/phone_ext)[2]"/></xsl:call-template></span>
													</div>

													<div class="col-sm-035">
															<span class="labels"> Email </span>
															<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/contact/email)[2]"/></xsl:call-template></span>
													</div>
											</div>
											<div class="row">
												<div class="col-sm-024">
													<span class="labels"> Street Address </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/street_address)[2]"/></xsl:call-template></span>
												</div>
												<div class="col-sm-016">
													<span class="labels"> City or Town </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/city)[2]"/></xsl:call-template></span>
												</div>
												<div class="col-sm-016">
													<span class="labels"> Country </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/country/@label_en)[2]"/></xsl:call-template></span>
												</div>
												<div class="col-sm-024">
													<span class="labels"> Province or State </span>
													<span class="company_enrol">
														<xsl:if test="((applicant/address/province_lov)[2]) != ''">
														<xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/province_lov)[1]"/></xsl:call-template>
													</xsl:if>
													<xsl:if test="((applicant/address/province_lov)[2]) = ''">
														<xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/province_text)[1]"/></xsl:call-template>
													</xsl:if>
													</span>
												</div>
												<div class="col-sm-016">
													<span class="labels"> Postal Code </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="(applicant/address/postal_code)[2]"/></xsl:call-template></span>
												</div>
											</div>
									</div>
							</div>
					</div>
				</div>
			</xsl:if>
			<div class="panel panel-warning">
				<header class="panel-warning panel-heading">
				<h2 class="panel-warning panel-title"> 2. Patent Information </h2>
			</header>

			<div class="panel-warning panel-body">
					<div class="col-sm-099">
							<div class="well well-sm" >
									<div class="row">
											<div class="col-sm-024">
													<span class="labels"> Canadian Patent Number </span>
														<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/patent_info/patent_number"/></xsl:call-template></span>
											</div>
											<div class="col-sm-024">
													<span class="labels"> Patent Filing Date </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/patent_info/filing_date"/></xsl:call-template></span>

											</div>
											<div class="col-sm-024">
													<span class="labels"> Patent Date Granted </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/patent_info/granted_date"/></xsl:call-template></span>
											</div>
											<div class="col-sm-024">
													<span class="labels"> Patent Expiration Date </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/patent_info/expiry_date"/></xsl:call-template></span>
											</div>
									</div>
							</div>
					</div>
			</div>
		</div>
		<div class="panel panel-warning">
			<header class="panel-warning panel-heading">
			<h2 class="panel-warning panel-title"> 3. New Drug Submission (NDS) Information </h2>
		</header>
		<div class="panel-warning panel-body">
				<div class="col-sm-099">
						<div class="well well-sm" >
								<div class="row">
										<div class="col-sm-024">
												<span class="labels"> NDS Number </span>
													<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/control_number"/></xsl:call-template></span>
										</div>
								</div>
						</div>
				</div>
		</div>
	</div>

	<div class="panel panel-warning">
		<header class="panel-warning panel-heading">
		<h2 class="panel-warning panel-title"> 4. Drug Use </h2>
	</header>
	<div class="panel-warning panel-body">
			<div class="col-sm-099">
					<div class="well well-sm" >
							<div class="row">
									<div class="col-sm-024">
											<span class="labels"> Drug use </span>
												<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/drug_use"/></xsl:call-template></span>
									</div>
							</div>
					</div>
			</div>
	</div>
	</div>

	<div class="panel panel-warning">
		<header class="panel-warning panel-heading">
			<h2 class="panel-warning panel-title"> 5. Time of Application </h2>
		</header>
		<div class="panel-warning panel-body">
											<span class="labels"> Applicant is applying
													<xsl:choose>
														<xsl:when test="application_info/time_application = 'GRANT'">
															<p style="font-family:Arial;font-weight:normal;">on the basis of a patent granted after the day on which the Notice of Compliance (NOC) for the above noted NDS is issued (before the end of the 120-day period that begins on the day on which the patent is granted)
															</p>
														</xsl:when>
															<xsl:otherwise>
																<p style="font-family:Arial;font-weight:normal;">
																	on the basis of a patent granted on or before the day on which the Notice of Compliance (NOC) for the above noted NDS is issued (before the end of the 120-day period that begins on the day on which the NOC is issued),
																</p>
															</xsl:otherwise>
													</xsl:choose>
											</span>
										</div>
									</div>

									<div class="panel panel-warning">
										<header class="panel-warning panel-heading">
										<h2 class="panel-warning panel-title"> 6. Medicinal Ingredient </h2>
									</header>
									<div class="panel-warning panel-body">
											<div class="col-sm-099">
													<div class="well well-sm" >
															<div class="row">
																	<div class="col-sm-099">
																			<span class="labels"> Medicinal Ingredient or combination of medicinal ingredients (as provided on the NOC for the NDS provided in Section 3) </span>
																				<pre style="font-size:1em"><span style="padding:2px" class="company_enrol"> <xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="application_info/medicinal_ingredient"/></xsl:call-template></span></pre>
																	</div>
															</div>
													</div>
											</div>
									</div>
								</div>


									<div class="panel panel-warning">
										<header class="panel-warning panel-heading">
											<h2 class="panel-warning panel-title"> 7. Attestations </h2>
										</header>
										<div class="panel-warning panel-body">
																			<span class="labels"> Attestation as to Applicant: </span>
																					<xsl:choose>
																						<xsl:when test="application_info/applicant_statement = 'BEHALF_OWNER'">
																							<p style="font-family:Arial;">
																								The Applicant is a manufacturer who is authorized by the person recorded in the Canadian Intellectual Property Office
																								as the owner of the above noted Canadian Patent to file this application on their behalf and the above noted NDS was
																								issued to the Applicant.
																							</p>
																						</xsl:when>
																							<xsl:otherwise>
																								<p style="font-family:Arial;">
																									The Applicant is the patentee and is recorded as an owner of the above noted Canadian Patent at the Canadian Intellectual Property Office.																								</p>
																							</xsl:otherwise>
																					</xsl:choose>
																			<span class="labels"> Attestation as to Timely Submission: </span>
																					<xsl:choose>
																						<xsl:when test="timely_submission_info/timely_submission_statement = 'NO_APPLICATION'">
																							<p style="font-family:Arial;">When the application for the authorization for sale referred to in paragraph 106(1)(c) of the Patent Act (above noted NDS) was filed with the Minister of Health, no application for a marketing approval, equivalent to an authorization for sale, with respect to the medicinal ingredient or combination of medicinal ingredients, as the case may be, set out in this CSP application had been submitted in the European Union or any country that is a member of the European Union, the United States of America, Australia, Switzerland or Japan. </p>
                                              </xsl:when>
																							<xsl:otherwise>
																								<p style="font-family:Arial;">
																									If one or more applications for a marketing approval, equivalent to an authorization for sale, with respect to the medicinal ingredient or combination of medicinal ingredients,
																									as the case may be, set out in this CSP application had been submitted in one or more of the European Union or any country that is a member of the European Union, the United States of America,
																									Australia, Switzerland or Japan, the application for the authorization for sale referred to in paragraph 106(1)(c) of the Patent Act (above noted NDS) was filed with the Minister of Health
																									before the end of the 18 month period that begins on the date of submission of the first of those marketing approval applications. Details of the first of those marketing approval applications are as follows: 																							</p>
																							</xsl:otherwise>
																					</xsl:choose>
																					<xsl:if test="timely_submission_info/timely_submission_statement = 'APPLICATION'">
																					<div class="panel-warning panel-body">
																							<div class="col-sm-099">
																									<div class="well well-sm" >
																											<div class="row">
																													<div class="col-sm-049">
																															<span class="labels"> Application Date </span>
																																<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="timely_submission_info/marketing_application_date"/></xsl:call-template></span>
																													</div>
																													<div class="col-sm-049">
																															<span class="labels"> Country of first marketing approval application </span>
																															<xsl:choose>
																															<xsl:when test="timely_submission_info/marketing_country='EU_OTHER'">
																																<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="timely_submission_info/marketing_country_eu"/></xsl:call-template></span>
																															</xsl:when>
																															<xsl:otherwise>
																															<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="timely_submission_info/marketing_country"/></xsl:call-template></span>
																														</xsl:otherwise>
																														</xsl:choose>
																															<!--<xsl:choose>
																																<xsl:when test="timely_submission_info/marketing_country ='EU_OTHER'">
																																<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="timely_submission_info/marketing_country_eu"/></xsl:call-template></span>
                                                              </xsl:when>
                                                                <xsl:when test="timely_submission_info/marketing_country ='USA'">
																																<span class="company_enrol"><xsl:text>United States</xsl:text></span>
                                                              </xsl:when>
                                                                <xsl:when test="timely_submission_info/marketing_country ='CHE'">
                                                                <span class="company_enrol"><xsl:text>Switzerland</xsl:text></span>
                                                              </xsl:when>
                                                                <xsl:when test="timely_submission_info/marketing_country ='AUS'">
                                                                <span class="company_enrol"><xsl:text>Australia</xsl:text></span>
                                                              </xsl:when>
                                                                <xsl:when test="timely_submission_info/marketing_country ='AUS'">
                                                                <span class="company_enrol"><xsl:text>Australia</xsl:text></span>
                                                              </xsl:when>
                                                                <xsl:when test="timely_submission_info/marketing_country ='EU'">
                                                                <span class="company_enrol"><xsl:text>The European Union</xsl:text></span>
                                                              </xsl:when>
                                                                <xsl:when test="timely_submission_info/marketing_country ='JPN'">
                                                                  <span class="company_enrol"><xsl:text>Japan</xsl:text></span>
                                                                </xsl:when>
																															<xsl:otherwise>
																																<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="timely_submission_info/marketing_country"/></xsl:call-template></span>
																															</xsl:otherwise>
																														</xsl:choose>-->
																													</div>
																											</div>
																									</div>
																							</div>
																					</div>
																				</xsl:if>
																		</div>
																	</div>
																	<div class="panel panel-warning">
																		<header class="panel-warning panel-heading">
																		<h2 class="panel-warning panel-title"> 8. Fee Payment (use seperate Advances Payment Details Form) </h2>
																	</header>
																	<div class="panel-warning panel-body">
																			<div class="col-sm-099">
																					<div class="well well-sm" >
																							<div class="row">
																									<div class="col-sm-099">
																										<span class="labels" style="visibility: hidden;"> . </span>
																										<span class="labels">
                                                      This form should <u>not</u> include payment information (eg credit card number) other than as specifically requested below, as the information included within an electronic submission cannot be deleted and will remain as part of the CSP application on record. As such, please separately <u>mail</u> or <u>fax</u> the
                                                      <a href="http://www.hc-sc.gc.ca/dhp-mps/alt_formats/pdf/prodpharma/applic-demande/form/adv_pa_av-eng.pdf">Advance Payment Details for Drug Submissions and Master Files for Human and Disinfectant Drugs, and Certificate of Supplementary Protection Application Form</a>
                                                      <br/>
                                                      <br/>
																											<xsl:element name="input">
																												<xsl:attribute name="type">checkbox</xsl:attribute>
																												<xsl:if test="advanced_payment/advanced_payment_ack = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
																												<xsl:attribute name="disabled">enabled</xsl:attribute>
																											</xsl:element>
																											The Advanced Payment Details form is being submitted separately by fax or mail
																										</span>
																									</div>
																							</div>
																							<div class="row">
																								<div class="col-sm-065">
																									<span class="labels"> The fee is being paid or the fee has been prepaid in the amount of (please enter the fee amount)</span>
																										<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="advanced_payment/advanced_payment_fee"/></xsl:call-template></span>
																								</div>
																								<div class="col-sm-032">
																									<span class="labels"> Method of Advanced Payment </span>
																										<span class="company_enrol">
																												<xsl:if test="advanced_payment/advanced_payment_type = 'FINANCIAL'">
																													<xsl:text> Payment through a Canadian Financial Institution </xsl:text>
																												</xsl:if>
																												<xsl:if test="advanced_payment/advanced_payment_type = 'CHEQUE'">
																													<xsl:text> Cheque / Bank Draft / Money Order </xsl:text>
																												</xsl:if>
																												<xsl:if test="advanced_payment/advanced_payment_type = 'CREDIT_CARD'">
																													<xsl:text> MasterCard / Visa / American Express (AMEX) / Visa Debit / JCB International </xsl:text>
																												</xsl:if>
																												<xsl:if test="advanced_payment/advanced_payment_type = 'CREDIT'">
																													<xsl:text> Payment Using Existing Credit </xsl:text>
																												</xsl:if>
																												<xsl:if test="advanced_payment/advanced_payment_type = 'WIRE'">
																													<xsl:text> Wire </xsl:text>
																												</xsl:if>
																									</span>
																								</div>
																							</div>
																					</div>
																			</div>
																	</div>
																	</div>

																	<div class="panel panel-warning">
																		<header class="panel-warning panel-heading">
																		<h2 class="panel-warning panel-title"> 9. Certification </h2>
																	</header>
																	<div class="panel-warning panel-body">
																		<h3> Name of Authorized Official </h3>
																			<div class="col-sm-099">
																					<div class="well well-sm" >
																							<div class="row">
																									<div class="col-sm-024">
																											<span class="labels"> First Name </span>
																												<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="certification/given_name"/></xsl:call-template></span>
																									</div>
																									<div class="col-sm-008">
																											<span class="labels"> Initials </span>
																													<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="certification/initials"/></xsl:call-template></span>
																									</div>
																									<div class="col-sm-024">
																											<span class="labels"> Last Name </span>
																												<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="certification/surname"/></xsl:call-template></span>
																									</div>
																									<div class="col-sm-024">
																											<span class="labels"> Job Title </span>
																												<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="certification/job_title"/></xsl:call-template></span>
																									</div>
																									<div class="col-sm-016">
																											<span class="labels"> Date </span>
																												<span class="company_enrol"><xsl:call-template name="Dropdown_Label"><xsl:with-param name="input" select="certification/date_signed"/></xsl:call-template></span>
																									</div>
																							</div>
																					</div>
																			</div>
																	</div>
																</div>
						</div>
	</div>
</div>

	</section>
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
							<div class="col-sm-099">
								<span class="labels"> Company ID </span>
								<span class="company_enrol">
									<xsl:call-template name="Dropdown_Label">
										<xsl:with-param name="input" select="company_id" />
									</xsl:call-template> </span>
							</div>
						</div>
					</div>

					<br />

					<h3> Address Records </h3>

					<xsl:for-each select="address_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" >
									Address <xsl:value-of select="position()"/>
									<xsl:if test="(manufacturer = 'Y') or (mailing = 'Y') or (billing = 'Y') or (importer = 'Y')">
										(<xsl:if test="manufacturer = 'Y'">Manufacturer/Sponsor</xsl:if>
										<xsl:if test="(manufacturer = 'Y') and ((mailing = 'Y') or (billing = 'Y') or (importer = 'Y'))">, </xsl:if>
										<xsl:if test="mailing = 'Y'">Mailing</xsl:if>
										<xsl:if test="(mailing = 'Y') and ((billing = 'Y') or (importer = 'Y'))">, </xsl:if>
										<xsl:if test="billing = 'Y'">Billing</xsl:if>
										<xsl:if test="(billing = 'Y') and (importer = 'Y')">, </xsl:if>
										<xsl:if test="importer = 'Y'">Canadian Importer</xsl:if>)
									</xsl:if>
								</h3>
							</header>

							<div>
							<div class="panel-warning panel-body">
								<div class="col-sm-099" >
									<h4> Company Information </h4>
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Company Name [Full Legal Name] </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_name" /> </span>
											</div>
										</div>
									</div>
								</div>

								<div class="col-sm-099">
									<h4> Address Information </h4>
									<div class="well well-sm">
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Street / Suite / P.O. Box </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/street_address" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-024">
												<span class="labels"> City / Town </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/city" /> </span>
											</div>
											<div class="col-sm-024">
												<span class="labels"> Province </span>
												<span class="company_enrol"> <xsl:choose><xsl:when test="(company_address_details/country = 'CAN') or (company_address_details/country = 'USA')"><xsl:call-template name="Dropdown_Label"> <xsl:with-param name="input" select="company_address_details/province_lov"/> </xsl:call-template></xsl:when><xsl:otherwise><xsl:call-template name="Dropdown_Label"> <xsl:with-param name="input" select="company_address_details/province_text"/> </xsl:call-template></xsl:otherwise></xsl:choose> </span>
											</div>
											<div class="col-sm-024">
												<span class="labels"> Country </span>
												<span class="company_enrol">
                          <xsl:value-of select="company_address_details/country/@label_en"/>
												</span>
												</div>
											<div class="col-sm-024">
												<span class="labels"> Postal / ZIP Code </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_address_details/postal_code" /> </span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					</xsl:for-each>

					<h3> Contact Records </h3>

					<xsl:for-each select="contact_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" >
									Contact <xsl:value-of select="position()"/>
									<xsl:if test="(manufacturer = 'Y') or (mailing = 'Y') or (billing = 'Y') or (rep_primary = 'Y') or (rep_secondary = 'Y')">
										(<xsl:if test="manufacturer = 'Y'">Manufacturer/Sponsor</xsl:if>
										<xsl:if test="(manufacturer = 'Y') and ((mailing = 'Y') or (billing = 'Y') or (rep_primary = 'Y') or (rep_secondary = 'Y'))">, </xsl:if>
										<xsl:if test="mailing = 'Y'">Mailing</xsl:if>
										<xsl:if test="(mailing = 'Y') and ((billing = 'Y') or (rep_primary = 'Y') or (rep_secondary = 'Y'))">, </xsl:if>
										<xsl:if test="billing = 'Y'">Billing</xsl:if>
										<xsl:if test="(billing = 'Y') and ((rep_primary = 'Y') or (rep_secondary = 'Y'))">, </xsl:if>
										<xsl:if test="rep_primary = 'Y'">REP Primary</xsl:if>
										<xsl:if test="(rep_primary = 'Y') and (rep_secondary = 'Y')">, </xsl:if>
										<xsl:if test="rep_secondary = 'Y'">REP Secondary</xsl:if>)
									</xsl:if>
								</h3>
							</header>

							<div class="panel-warning panel-body">
								<div class="col-sm-099">
									<h4> Company Representative Information </h4>
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-005">
												<span class="labels"> Salutation </span>
												<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"> <xsl:with-param name="input" select="company_contact_details/salutation"/> </xsl:call-template> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Given Name </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/given_name" /> </span>
											</div>
											<div class="col-sm-005">
												<span class="labels"> Initials </span>
												<span class="company_enrol">
													<xsl:call-template name="Dropdown_Label">
													<xsl:with-param name="input" select="company_contact_details/initials" />
												</xsl:call-template>
											</span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Surname </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/surname" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Job Title </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/job_title" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Language Correspondence </span>
												<span class="company_enrol"> <xsl:call-template name="Dropdown_Label"> <xsl:with-param name="input" select="company_contact_details/language_correspondance"/> </xsl:call-template> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-027">
												<span class="labels"> Phone Number </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/phone_num" /> </span>
											</div>
											<div class="col-sm-016">
												<span class="labels"> Phone Extension </span>
												<span class="company_enrol">
													<xsl:call-template name="Dropdown_Label">
														<xsl:with-param name="input" select="company_contact_details/phone_ext" />
													</xsl:call-template> </span>
											</div>
											<div class="col-sm-027">
												<span class="labels"> Fax Number </span>
												<span class="company_enrol">
													<xsl:call-template name="Dropdown_Label">
														<xsl:with-param name="input" select="company_contact_details/fax_num" />
													</xsl:call-template>
												</span>
											</div>
											<div class="col-sm-027">
												<span class="labels"> Email </span>
												<span class="company_enrol"> <xsl:apply-templates select="company_contact_details/email" /> </span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</xsl:for-each>
				</div>
			</div>
		</section>
	</xsl:template>




	<!-- String to Paragraph -->
	<xsl:template name="String_To_Paragraph">
		<xsl:param name="input" />
		<xsl:choose>
			<xsl:when test="contains($input, '&#10;')">
				<xsl:value-of select="substring-before($input, '&#10;')" /><br />
				<xsl:call-template name="String_To_Paragraph">
					<xsl:with-param name="input" select="substring-after($input, '&#10;')" />
				</xsl:call-template>
			</xsl:when>
			<xsl:otherwise>
				<xsl:value-of select="$input" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>

	<!-- Dropdown Label Formatter-->
	<xsl:template name="Dropdown_Label">
		<xsl:param name="input" />
		<xsl:choose>
			<!-- Yes/No -->
			<xsl:when test="$input = 'Y'">
				<xsl:text disable-output-escaping="yes">Yes</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'N'">
				<xsl:text disable-output-escaping="yes">No</xsl:text>
			</xsl:when>

			<!-- Languages -->

			<xsl:when test="$input = 'en'">
				<xsl:text>English</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'fr'">
				<xsl:text>French</xsl:text>
			</xsl:when>

			<!-- Salutation -->

			<xsl:when test="$input = 'SALUT_DR'">
				<xsl:text>Dr.</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SALUT_MR'">
				<xsl:text>Mr.</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SALUT_MRS'">
				<xsl:text>Mrs.</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SALUT_MS'">
				<xsl:text>Ms.</xsl:text>
			</xsl:when>

			<!-- Provinces -->

			<xsl:when test="$input = 'AB'">
				<xsl:text>Alberta</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BC'">
				<xsl:text>British Columbia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MB'">
				<xsl:text>Manitoba</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NB'">
				<xsl:text>New Brunswick</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NL'">
				<xsl:text>Newfoundland and Labrador</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NS'">
				<xsl:text>Nova Scotia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NT'">
				<xsl:text>Northwest Territories</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NU'">
				<xsl:text>Nunavut</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ON'">
				<xsl:text>Ontario</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PE'">
				<xsl:text>Prince Edward Island</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'QC'">
				<xsl:text>Quebec</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SK'">
				<xsl:text>Saskatchewan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'YT'">
				<xsl:text>Yukon</xsl:text>
			</xsl:when>
			<xsl:when test="$input=''">
				<xsl:text>&#160;</xsl:text>
			</xsl:when>
			<!-- Countries -->

			<xsl:when test="$input = 'AFG'">
				<xsl:text>Afghanistan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ALA'">
				<xsl:text>Aland Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ALB'">
				<xsl:text>Albania</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'DZA'">
				<xsl:text>Algeria</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ASM'">
				<xsl:text>American Samoa</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'AND'">
				<xsl:text>Andorra</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'AGO'">
				<xsl:text>Angola</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'AIA'">
				<xsl:text>Anguilla</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ATA'">
				<xsl:text>Antarctica</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ATG'">
				<xsl:text>Antigua and Barbuda</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ARG'">
				<xsl:text>Argentina</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ARM'">
				<xsl:text>Armenia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ABW'">
				<xsl:text>Aruba</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'AUS'">
				<xsl:text>Australia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'AUT'">
				<xsl:text>Austria</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'AZE'">
				<xsl:text>Azerbaijan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BHS'">
				<xsl:text>Bahamas</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BHR'">
				<xsl:text>Bahrain</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BGD'">
				<xsl:text>Bangladesh</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BRB'">
				<xsl:text>Barbados</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BLR'">
				<xsl:text>Belarus</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BEL'">
				<xsl:text>Belgium</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BLZ'">
				<xsl:text>Belize</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BEN'">
				<xsl:text>Benin</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BMU'">
				<xsl:text>Bermuda</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BTN'">
				<xsl:text>Bhutan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BOL'">
				<xsl:text>Bolivia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BIH'">
				<xsl:text>Bosnia and Herzegovina</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BWA'">
				<xsl:text>Botswana</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BVT'">
				<xsl:text>Bouvet Island</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BRA'">
				<xsl:text>Brazil</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VGB'">
				<xsl:text>British Virgin Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IOT'">
				<xsl:text>British Indian Ocean Territory</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BRN'">
				<xsl:text>Brunei Darussalam</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BGR'">
				<xsl:text>Bulgaria</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BFA'">
				<xsl:text>Burkina Faso</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BDI'">
				<xsl:text>Burundi</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KHM'">
				<xsl:text>Cambodia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CMR'">
				<xsl:text>Cameroon</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CAN'">
				<xsl:text>Canada</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CPV'">
				<xsl:text>Cape Verde</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CYM'">
				<xsl:text>Cayman Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CAF'">
				<xsl:text>Central African Republic</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TCD'">
				<xsl:text>Chad</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CHL'">
				<xsl:text>Chile</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CHN'">
				<xsl:text>China</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'HKG'">
				<xsl:text>Hong Kong, Special Administrative Region of China</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MAC'">
				<xsl:text>Macao, Special Administrative Region of China</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CXR'">
				<xsl:text>Christmas Island</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CCK'">
				<xsl:text>Cocos (Keeling) Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'COL'">
				<xsl:text>Colombia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'COM'">
				<xsl:text>Comoros</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'COG'">
				<xsl:text>Congo (Brazzaville)</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'COD'">
				<xsl:text>Congo, Democratic Republic of the</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'COK'">
				<xsl:text>Cook Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CRI'">
				<xsl:text>Costa Rica</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CIV'">
				<xsl:text>Côte d'Ivoire</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'HRV'">
				<xsl:text>Croatia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CUB'">
				<xsl:text>Cuba</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CYP'">
				<xsl:text>Cyprus</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CZE'">
				<xsl:text>Czech Republic</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'DNK'">
				<xsl:text>Denmark</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'DJI'">
				<xsl:text>Djibouti</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'DMA'">
				<xsl:text>Dominica</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'DOM'">
				<xsl:text>Dominican Republic</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ECU'">
				<xsl:text>Ecuador</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'EGY'">
				<xsl:text>Egypt</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SLV'">
				<xsl:text>El Salvador</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GNQ'">
				<xsl:text>Equatorial Guinea</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ERI'">
				<xsl:text>Eritrea</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'EST'">
				<xsl:text>Estonia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ETH'">
				<xsl:text>Ethiopia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'FLK'">
				<xsl:text>Falkland Islands (Malvinas)</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'FRO'">
				<xsl:text>Faroe Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'FJI'">
				<xsl:text>Fiji</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'FIN'">
				<xsl:text>Finland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'FRA'">
				<xsl:text>France</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GUF'">
				<xsl:text>French Guiana</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PYF'">
				<xsl:text>French Polynesia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ATF'">
				<xsl:text>French Southern Territories</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GAB'">
				<xsl:text>Gabon</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GMB'">
				<xsl:text>Gambia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GEO'">
				<xsl:text>Georgia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'DEU'">
				<xsl:text>Germany</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GHA'">
				<xsl:text>Ghana</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GIB'">
				<xsl:text>Gibraltar</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GRC'">
				<xsl:text>Greece</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GRL'">
				<xsl:text>Greenland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GRD'">
				<xsl:text>Grenada</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GLP'">
				<xsl:text>Guadeloupe</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GUM'">
				<xsl:text>Guam</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GTM'">
				<xsl:text>Guatemala</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GGY'">
				<xsl:text>Guernsey</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GIN'">
				<xsl:text>Guinea</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GNB'">
				<xsl:text>Guinea-Bissau</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GUY'">
				<xsl:text>Guyana</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'HTI'">
				<xsl:text>Haiti</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'HMD'">
				<xsl:text>Heard Island and Mcdonald Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VAT'">
				<xsl:text>Holy See (Vatican City State)</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'HND'">
				<xsl:text>Honduras</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'HUN'">
				<xsl:text>Hungary</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ISL'">
				<xsl:text>Iceland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IND'">
				<xsl:text>India</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IDN'">
				<xsl:text>Indonesia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IRN'">
				<xsl:text>Iran, Islamic Republic of</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IRQ'">
				<xsl:text>Iraq</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IRL'">
				<xsl:text>Ireland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'IMN'">
				<xsl:text>Isle of Man</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ISR'">
				<xsl:text>Israel</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ITA'">
				<xsl:text>Italy</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'JAM'">
				<xsl:text>Jamaica</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'JPN'">
				<xsl:text>Japan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'JEY'">
				<xsl:text>Jersey</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'JOR'">
				<xsl:text>Jordan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KAZ'">
				<xsl:text>Kazakhstan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KEN'">
				<xsl:text>Kenya</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KIR'">
				<xsl:text>Kiribati</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PRK'">
				<xsl:text>Korea, Democratic People's Republic of</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KOR'">
				<xsl:text>Korea, Republic of</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KWT'">
				<xsl:text>Kuwait</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KGZ'">
				<xsl:text>Kyrgyzstan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LAO'">
				<xsl:text>Lao PDR</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LVA'">
				<xsl:text>Latvia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LBN'">
				<xsl:text>Lebanon</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LSO'">
				<xsl:text>Lesotho</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LBR'">
				<xsl:text>Liberia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LBY'">
				<xsl:text>Libya</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LIE'">
				<xsl:text>Liechtenstein</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LTU'">
				<xsl:text>Lithuania</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LUX'">
				<xsl:text>Luxembourg</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MKD'">
				<xsl:text>Macedonia, Republic of</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MDG'">
				<xsl:text>Madagascar</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MWI'">
				<xsl:text>Malawi</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MYS'">
				<xsl:text>Malaysia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MDV'">
				<xsl:text>Maldives</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MLI'">
				<xsl:text>Mali</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MLT'">
				<xsl:text>Malta</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MHL'">
				<xsl:text>Marshall Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MTQ'">
				<xsl:text>Martinique</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MRT'">
				<xsl:text>Mauritania</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MUS'">
				<xsl:text>Mauritius</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MYT'">
				<xsl:text>Mayotte</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MEX'">
				<xsl:text>Mexico</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'FSM'">
				<xsl:text>Micronesia, Federated States of</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MDA'">
				<xsl:text>Moldova</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MCO'">
				<xsl:text>Monaco</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MNG'">
				<xsl:text>Mongolia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MNE'">
				<xsl:text>Montenegro</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MSR'">
				<xsl:text>Montserrat</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MAR'">
				<xsl:text>Morocco</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MOZ'">
				<xsl:text>Mozambique</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MMR'">
				<xsl:text>Myanmar</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NAM'">
				<xsl:text>Namibia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NRU'">
				<xsl:text>Nauru</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NPL'">
				<xsl:text>Nepal</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NLD'">
				<xsl:text>Netherlands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ANT'">
				<xsl:text>Netherlands Antilles</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NCL'">
				<xsl:text>New Caledonia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NZL'">
				<xsl:text>New Zealand</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NIC'">
				<xsl:text>Nicaragua</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NER'">
				<xsl:text>Niger</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NGA'">
				<xsl:text>Nigeria</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NIU'">
				<xsl:text>Niue</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NFK'">
				<xsl:text>Norfolk Island</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MNP'">
				<xsl:text>Northern Mariana Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'NOR'">
				<xsl:text>Norway</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'OMN'">
				<xsl:text>Oman</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PAK'">
				<xsl:text>Pakistan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PLW'">
				<xsl:text>Palau</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PSE'">
				<xsl:text>Palestinian Territory, Occupied</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PAN'">
				<xsl:text>Panama</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PNG'">
				<xsl:text>Papua New Guinea</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PRY'">
				<xsl:text>Paraguay</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PER'">
				<xsl:text>Peru</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PHL'">
				<xsl:text>Philippines</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PCN'">
				<xsl:text>Pitcairn</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'POL'">
				<xsl:text>Poland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PRT'">
				<xsl:text>Portugal</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'PRI'">
				<xsl:text>Puerto Rico</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'QAT'">
				<xsl:text>Qatar</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'REU'">
				<xsl:text>Réunion</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ROU'">
				<xsl:text>Romania</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'RUS'">
				<xsl:text>Russian Federation</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'RWA'">
				<xsl:text>Rwanda</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'BLM'">
				<xsl:text>Saint-Barthélemy</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SHN'">
				<xsl:text>Saint Helena</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'KNA'">
				<xsl:text>Saint Kitts and Nevis</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LCA'">
				<xsl:text>Saint Lucia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'MAF'">
				<xsl:text>Saint-Martin (French part)</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SPM'">
				<xsl:text>Saint Pierre and Miquelon</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VCT'">
				<xsl:text>Saint Vincent and Grenadines</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'WSM'">
				<xsl:text>Samoa</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SMR'">
				<xsl:text>San Marino</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'STP'">
				<xsl:text>Sao Tome and Principe</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SAU'">
				<xsl:text>Saudi Arabia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SEN'">
				<xsl:text>Senegal</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SRB'">
				<xsl:text>Serbia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SYC'">
				<xsl:text>Seychelles</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SLE'">
				<xsl:text>Sierra Leone</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SGP'">
				<xsl:text>Singapore</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SVK'">
				<xsl:text>Slovakia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SVN'">
				<xsl:text>Slovenia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SLB'">
				<xsl:text>Solomon Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SOM'">
				<xsl:text>Somalia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ZAF'">
				<xsl:text>South Africa</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SGS'">
				<xsl:text>South Georgia and the South Sandwich Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SSD'">
				<xsl:text>South Sudan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ESP'">
				<xsl:text>Spain</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'LKA'">
				<xsl:text>Sri Lanka</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SDN'">
				<xsl:text>Sudan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SUR'">
				<xsl:text>Suriname *</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SJM'">
				<xsl:text>Svalbard and Jan Mayen Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SWZ'">
				<xsl:text>Swaziland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SWE'">
				<xsl:text>Sweden</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'CHE'">
				<xsl:text>Switzerland</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'SYR'">
				<xsl:text>Syrian Arab Republic (Syria)</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TWN'">
				<xsl:text>Taiwan, Republic of China</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TJK'">
				<xsl:text>Tajikistan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TZA'">
				<xsl:text>Tanzania *, United Republic of</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'THA'">
				<xsl:text>Thailand</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TLS'">
				<xsl:text>Timor-Leste</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TGO'">
				<xsl:text>Togo</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TKL'">
				<xsl:text>Tokelau</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TON'">
				<xsl:text>Tonga</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TTO'">
				<xsl:text>Trinidad and Tobago</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TUN'">
				<xsl:text>Tunisia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TUR'">
				<xsl:text>Turkey</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TKM'">
				<xsl:text>Turkmenistan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TCA'">
				<xsl:text>Turks and Caicos Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'TUV'">
				<xsl:text>Tuvalu</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'UGA'">
				<xsl:text>Uganda</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'UKR'">
				<xsl:text>Ukraine</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ARE'">
				<xsl:text>United Arab Emirates</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'GBR'">
				<xsl:text>United Kingdom</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'USA'">
				<xsl:text>United States of America</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'UMI'">
				<xsl:text>United States Minor Outlying Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'URY'">
				<xsl:text>Uruguay</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'UZB'">
				<xsl:text>Uzbekistan</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VUT'">
				<xsl:text>Vanuatu</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VEN'">
				<xsl:text>Venezuela (Bolivarian Republic of)</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VNM'">
				<xsl:text>Viet Nam</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'VIR'">
				<xsl:text>Virgin Islands, US</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'WLF'">
				<xsl:text>Wallis and Futuna Islands</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ESH'">
				<xsl:text>Western Sahara</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'YEM'">
				<xsl:text>Yemen</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ZMB'">
				<xsl:text>Zambia</xsl:text>
			</xsl:when>
			<xsl:when test="$input = 'ZWE'">
				<xsl:text>Zimbabwe</xsl:text>
			</xsl:when>

			<!-- OTHERWISE -->

			<xsl:otherwise>
				<xsl:value-of select="$input" />
			</xsl:otherwise>
		</xsl:choose>
	</xsl:template>
</xsl:stylesheet>
<!-- Stylus Studio meta-information - (c) 2004-2009. Progress Software Corporation. All rights reserved.

<metaInformation>
	<scenarios>
		<scenario default="yes" name="Scenario1" userelativepaths="no" externalpreview="yes" url="file:///e:/ip400Demo/hccsp-2-0.xml" htmlbaseurl="" outputurl="file:///c:/SPM/test/csp.html" processortype="saxon8" useresolver="yes" profilemode="0"
		          profiledepth="" profilelength="" urlprofilexml="" commandline="" additionalpath="" additionalclasspath="" postprocessortype="none" postprocesscommandline="" postprocessadditionalpath="" postprocessgeneratedext="" validateoutput="no"
		          validator="internal" customvalidator="">
			<advancedProp name="sInitialMode" value=""/>
			<advancedProp name="schemaCache" value="||"/>
			<advancedProp name="bXsltOneIsOkay" value="true"/>
			<advancedProp name="bSchemaAware" value="true"/>
			<advancedProp name="bGenerateByteCode" value="true"/>
			<advancedProp name="bXml11" value="false"/>
			<advancedProp name="iValidation" value="0"/>
			<advancedProp name="bExtensions" value="true"/>
			<advancedProp name="iWhitespace" value="0"/>
			<advancedProp name="sInitialTemplate" value=""/>
			<advancedProp name="bTinyTree" value="true"/>
			<advancedProp name="xsltVersion" value="2.0"/>
			<advancedProp name="bWarnings" value="true"/>
			<advancedProp name="bUseDTD" value="false"/>
			<advancedProp name="iErrorHandling" value="fatal"/>
		</scenario>
	</scenarios>
	<MapperMetaTag>
		<MapperInfo srcSchemaPathIsRelative="yes" srcSchemaInterpretAsXML="no" destSchemaPath="" destSchemaRoot="" destSchemaPathIsRelative="yes" destSchemaInterpretAsXML="no"/>
		<MapperBlockPosition></MapperBlockPosition>
		<TemplateContext></TemplateContext>
		<MapperFilter side="source"></MapperFilter>
	</MapperMetaTag>
</metaInformation>
-->