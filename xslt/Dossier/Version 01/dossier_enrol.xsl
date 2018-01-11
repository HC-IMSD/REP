<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
	<xsl:template match="/">
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
			.row{
				overflow:hidden;
				text-overflow:ellipsis;
				overflow-x: auto;
			}
			.panel {
				margin-bottom: 13px;
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
				padding: 15px;
				height: auto;
				display: block;
			}
			.well-sm {
				border-radius: 3px;
			}
			.well {
				float: left;
				width: 98.8%;
				padding: 10px;
				margin-bottom: 5px;
				background-color: #f5f5f5;
				border: 1px solid #e3e3e3;
				border-radius: 4px;
				-webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
				box-shadow: inset 0 1px 1px rgba(0,0,0,.05);
			}
			.col-sm-005 {
				width: 5.0%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-008 {
				width: 8.0%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-012 {
				width: 12.3%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-016 {
				width: 16.10%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-019 {
				width: 19.42%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-021 {
				width: 21.65%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-022 {
				width: 22.29%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-023 {
				width: 23.70%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-024 {
				width: 24.43%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-027 {
				width: 27.05%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-032 {
				width: 32.77%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-035 {
				width: 35.60%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-036 {
				width: 36.68%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-049 {
				width: 49.4%;
				float: left;
				padding: 5px;
				margin-bottom: 0px;
			}			
			.col-sm-074 {
				width: 74.50%;
				float: left;
				padding: 5px;
				margin-bottom: 10px;
			}
			.col-sm-099 {
				width: 99.4%;
				float: left;
				padding: 5px;
				margin-bottom: 0px;
			}
		</style>

		<html>
			<body>
				<xsl:if test="count(DOSSIER_ENROL) &gt; 0"> <xsl:apply-templates select="DOSSIER_ENROL"></xsl:apply-templates> </xsl:if>
			</body>
		</html>
	</xsl:template>
	
	<!-- Company Enrolment -->
	<xsl:template match="DOSSIER_ENROL">
		<h1>Regulatory Enrolment Process</h1>
		<section>
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Dossier Information</h2>
				</div>
				
				<div class="panel-body">
					<div class="well well-sm" >
						<div class="row">
							<div class="col-sm-024">
								<span class="labels"> Enrolment Version </span>
								<span class="dossier_enrol"> <xsl:apply-templates select="enrolment_version" /> </span>
							</div>
							<div class="col-sm-024">
								<span class="labels"> Date Saved </span>
								<span class="dossier_enrol"> <xsl:apply-templates select="date_saved" /> </span>
							</div>
							<div class="col-sm-024">
								<span class="labels"> Application Type </span>
								<span class="dossier_enrol"> <xsl:apply-templates select="application_type" /> </span>
							</div>
							<div class="col-sm-024">
								<span class="labels"> Software Version </span>
								<span class="dossier_enrol"> <xsl:apply-templates select="software_version" /> </span>
							</div>
						</div>
					</div>
					
					<br />
					<br />
					<br />
					<br />
					<br />
					
					<div class="row">
						<div class="col-sm-099">
							<span class="labels"> Company ID </span>
							<span class="dossier_enrol"> <xsl:apply-templates select="company_id" /> </span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-099">
							<span class="labels" > Brand or Proprietary or Product Name (should be the same as the brand name on the product label)* </span>
							<span class="dossier_enrol"> <xsl:apply-templates select="product_name" /> </span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-099">
							<span class="labels" > Proper, Common or Non-Proprietary Name </span>
							<span class="dossier_enrol"> <xsl:apply-templates select="common_name" /> </span>
						</div>
					</div>
					<div class="row">
						<div class="col-sm-099">
							<span class="labels" > Related Dossier ID [If applicable] </span>
							<span class="dossier_enrol"> <xsl:apply-templates select="related_dossier_id" /> </span>
						</div>
					</div>
					<div class="well well-sm">
						<h3 style="margin-left: 5px;"> Therapeutic Classification(s) </h3>
						<xsl:for-each select="therapeutic_class_list/therapeutic_class">
							<div class="row">
								<div class="col-sm-099" >
									<span class="labels"> Therapeutic Classification <xsl:value-of select="position()"/> </span>
									<span class="dossier_enrol"> <xsl:apply-templates select="." /> </span>
								</div>
							</div>
						</xsl:for-each>
					</div>
					
					<xsl:for-each select="ref_product_list/cdn_ref_product">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > Canadian Reference Product <xsl:value-of select="position()"/> </h3>
							</header>
							
							<div class="panel-warning panel-body">
								<div class="col-sm-099">
									<div class="well well-sm">
										<div class="row">
											<div class="col-sm-099" >
												<span class="labels"> Amended Record? </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="../amend_record" /> </span>
											</div>
										</div>
									</div>
								</div>
								<div class="col-sm-099">
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Brand Name: </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="brand_name" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Medicinal Ingredient </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="medicinal_ingredient" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-049">
												<span class="labels"> Dosage Form: </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="dosage_form" /> </span>
											</div>
											<xsl:if test="dosage_form = 'OTHER'">
												<div class="col-sm-049">
													<span class="labels"> Dosage Form Details </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="dosage_form_other" /> </span>
												</div>
											</xsl:if>
										</div>
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Strength(s) </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="strengths" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-099">
												<span class="labels"> Company Name </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="company_name" /> </span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</xsl:for-each>
				</div>		
			</div>
			
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title">Drug Product Formulation Information</h2>
				</div>
				
				<div class="panel-body">
					<div class="row">
						<span class="labels"> Brand Name: </span>
						<div class="col-sm-012">
							<span class="labels">
								<xsl:element name="input">
									<xsl:attribute name="type">checkbox</xsl:attribute>
									<xsl:if test="human_drug_use = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
									<xsl:attribute name="disabled">disabled</xsl:attribute>
								</xsl:element>
								Human
							</span>
						</div>
						<div class="col-sm-012">
							<span class="labels">
								<xsl:element name="input">
									<xsl:attribute name="type">checkbox</xsl:attribute>
									<xsl:if test="radiopharm_drug_use = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
									<xsl:attribute name="disabled">disabled</xsl:attribute>
								</xsl:element>
								Radiopharmaceutical
							</span>
						</div>
						<div class="col-sm-012">
							<span class="labels">
								<xsl:element name="input">
									<xsl:attribute name="type">checkbox</xsl:attribute>
									<xsl:if test="vet_drug_use = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
									<xsl:attribute name="disabled">disabled</xsl:attribute>
								</xsl:element>
								Veterinary
							</span>
						</div>
						<div class="col-sm-012">
							<span class="labels">
								<xsl:element name="input">
									<xsl:attribute name="type">checkbox</xsl:attribute>
									<xsl:if test="disinfectant_drug_use = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
									<xsl:attribute name="disabled">disabled</xsl:attribute>
								</xsl:element>
								Disinfectant
							</span>
						</div>
					</div>
					
					<div class="row">
						<div class="col-sm-099">
							<span class="labels"> Is this a Non-Prescription drug to which one or more Schedule A claims apply? </span>
							<span class="dossier_enrol"> <xsl:apply-templates select="is_sched_a" /> </span>
						</div>
					</div>
					
					<xsl:if test="is_sched_a = 'Y'">
						<div class="row">
							<div class="well well-sm" >
								<div class="row">
									<div class="col-sm-099">
										<span class="labels"> DIN </span>
										<span class="dossier_enrol"> <xsl:apply-templates select="schedule_a_group/din_number" /> </span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels"> Please check the disease(s)/disorder(s) that apply to the claims made. (select at least one) </span>
										<span class="dossier_enrol" style="visibility: hidden;"> </span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/acute_alcohol = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Acute alcoholism
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/acute_anxiety = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Acute anxiety state
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/acute_infectious = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Acute infectious respiratory syndromes
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/acute_inflammatory = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Acute inflammatory and debilitating arthritis
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/acute_psychotic = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Acute psychotic conditions
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/addiction = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Addiction (except nicotine addiction)
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/ateriosclerosis = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Ateriosclerosis
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/appendicitis = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Appendicitis
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/asthma = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Asthma
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/cancer = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Cancer
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/congest_heart_fail = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Congestive heart failure
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/convulsions = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Convulsions
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/dementia = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Dementia
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/depression = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Depression
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/diabetes = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Diabetes
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/gangrene = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Gangrene
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/glaucoma = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Glaucoma
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/haematologic_bleeding = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Haematologic bleeding disorders
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/hepatitis = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Hepatitis
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/hypertension = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Hypertension
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/nausea_pregnancy = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Nausea and vomiting of pregnancy
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/obesity = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Obesity
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/rheumatic_fever = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Rheumatic fever
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/septicemia = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Septicemia
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/sex_transmit_disease = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Sexually transmitted diseases
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/strangulated_hernia = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Strangulated hernia
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/thrombotic_embolic_disorder = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Thrombotic and Embolic disorder
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/thyroid_disease = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Thyroid disease
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels">
											<xsl:element name="input">
												<xsl:attribute name="type">checkbox</xsl:attribute>
												<xsl:if test="schedule_a_group/ulcer_gastro = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
												<xsl:attribute name="disabled">disabled</xsl:attribute>
											</xsl:element>
											Ulcer of the gastro-intestinal tract
										</span>
									</div>
								</div>
								<div class="row">
									<div class="col-sm-099">
										<span class="labels"> Please list the Schedule A Claims/Indications associated with this product </span>
										<span class="dossier_enrol"> <xsl:apply-templates select="schedule_a_group/sched_a_claims_ind_details" /> </span>
									</div>
								</div>
							</div>
						</div>
					</xsl:if>
					
					<xsl:for-each select="formulation_group/formulation_details">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > Drug Product Formulation <xsl:value-of select="position()"/> </h3>
							</header>
							
							<div class="panel-warning panel-body">
								
								<!-- Pharmaceutical Information -->
								<div class="panel panel-warning" style="border-color: green;">
									<header class="panel-warning panel-heading" style="background-color: green; border-color: green;">
										<h3 class="panel-warning panel-title" style="background-color: green; color: white;"> Pharmaceutical Information </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<div class="row">
											<div class="col-sm-049">
												<span class="labels"> Dosage Form: </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="dosage_form_group/dosage_form" /> </span>
											</div>
											<xsl:if test="dosage_form_group/dosage_form = 'OTHER'">
												<div class="col-sm-049">
													<span class="labels"> Dosage Form Details </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="dosage_form_group/dosage_form_other" /> </span>
												</div>
											</xsl:if>
										</div>
										<div class="well well-sm" >
											<xsl:for-each select="roa_group/roa_details">
												<div class="row">
													<div class="col-sm-049">
														<span class="labels"> Route of Administration <xsl:value-of select="position()"/> </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="roa" /> </span>
													</div>
													<xsl:if test="roa = 'OTHER'">
														<div class="col-sm-049">
															<span class="labels"> Route of Administration Details </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="roa_other" /> </span>
														</div>
													</xsl:if>
												</div>
											</xsl:for-each>
										</div>
										<div class="well well-sm" >
											<xsl:for-each select="container_group/container_details">
												<div class="row">
													<div class="col-sm-023">
														<span class="labels" style="text-decoration: underline;"> Container Type <xsl:value-of select="position()"/> </span>
													</div>
													<div class="col-sm-023">
														<span class="labels" style="visibility: hidden;"> . </span>
													</div>
													<div class="col-sm-012">
														<span class="labels" style="text-align: right; text-decoration: underline;"> Shelf Life </span>
													</div>
													<div class="col-sm-012">
														<span class="labels" style="visibility: hidden;"> . </span>
													</div>
													<div class="col-sm-012">
														<span class="labels" style="text-align: right; text-decoration: underline;"> Temp. Range </span>
													</div>
													<div class="col-sm-012">
														<span class="labels" style="visibility: hidden;"> . </span>
													</div>
												</div>
												<div class="row">
													<div class="col-sm-023">
														<span class="labels"> Container Type </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="container_type" /> </span>
													</div>
													<div class="col-sm-023">
														<span class="labels"> Package Size </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="package_size" /> </span>
													</div>
													<div class="col-sm-012">
														<span class="labels"> Years </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="shelf_life_years" /> </span>
													</div>
													<div class="col-sm-012">
														<span class="labels"> Months </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="shelf_life_months" /> </span>
													</div>
													<div class="col-sm-012">
														<span class="labels"> Min. Celsius </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="temperature_min" /> </span>
													</div>
													<div class="col-sm-012">
														<span class="labels"> Max. Celsius </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="temperature_max" /> </span>
													</div>
												</div>
											</xsl:for-each>
										</div>
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Please indicate the country(ies) of manufacture for this drug product. </h3>
											<div class="row">
												<xsl:for-each select="country_group/country_manufacturer">
													<div class="col-sm-049">
														<span class="labels"> Country of Manufacture <xsl:value-of select="position()"/> </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="." /> </span>
													</div>
												</xsl:for-each>
											</div>
										</div>
									</div>
								</div>
								
								<!-- Medicinal (Active) Ingredient(s) -->
								<div class="panel panel-warning" style="border-color: purple;">
									<header class="panel-warning panel-heading" style="background-color: purple; border-color: purple;">
										<h3 class="panel-warning panel-title" style="background-color: purple; color: white;"> Medicinal (Active) Ingredient(s) </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<xsl:for-each select="active_ingredient">
											<div class="row">
												<div class="well well-sm" >
													<h3 style="margin-left: 5px;"> Medicinal Ingredient <xsl:value-of select="position()"/> </h3>
													<div class="row">
														<div class="col-sm-032">
															<span class="labels"> Chemical Abstracts Service No. </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="cas_number" /> </span>
														</div>
														<div class="col-sm-032">
															<span class="labels"> Active Ingredient Name </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="ingredient_name" /> </span>
														</div>
														<div class="col-sm-032">
															<span class="labels"> Standard </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="ingred_standard" /> </span>
														</div>
													</div>
													<div class="row">
														<div class="col-sm-016">
															<span class="labels"> Strength </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="strength" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Units </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="units" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Per </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="per" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Calculated as Base? </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="is_base_calc" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Nanomaterial? </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="is_nanomaterial" /> </span>
														</div>
														<xsl:if test="is_nanomaterial = 'Y'">
															<div class="col-sm-016">
																<span class="labels"> Please indicate the nanomaterial type </span>
																<span class="dossier_enrol"> <xsl:apply-templates select="nanomaterial_details" /> </span>
															</div>
														</xsl:if>
													</div>
													<div class="row">
														<div class="col-sm-099">
															<span class="labels"> Animal/Human Source? </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="is_human_animal_src" /> </span>
														</div>
													</div>
												</div>
											</div>
										</xsl:for-each>
									</div>
								</div>
								
								<!-- Non-Medicinal Ingredient(s) -->
								<div class="panel panel-warning" style="border-color: black;">
									<header class="panel-warning panel-heading" style="background-color: black; border-color: black;">
										<h3 class="panel-warning panel-title" style="background-color: black; color: white;"> Non-Medicinal Ingredient(s) </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<xsl:for-each select="nonmedicinal_ingredient">
											<div class="row">
												<div class="well well-sm" >
													<h3 style="margin-left: 5px;"> Non-Medicinal Ingredient <xsl:value-of select="position()"/> </h3>
													<div class="row">
														<div class="col-sm-032">
															<span class="labels"> Chemical Abstracts Service No. </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="cas_number" /> </span>
														</div>
														<div class="col-sm-032">
															<span class="labels"> Non-Medicinal Ingredient Name </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="ingredient_name" /> </span>
														</div>
														<div class="col-sm-032">
															<span class="labels"> Standard </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="ingred_standard" /> </span>
														</div>
													</div>
													<div class="row">
														<div class="col-sm-016">
															<span class="labels"> Strength </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="strength" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Units </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="units" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Per </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="per" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Calculated as Base? </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="is_base_calc" /> </span>
														</div>
														<div class="col-sm-016">
															<span class="labels"> Nanomaterial? </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="is_nanomaterial" /> </span>
														</div>
														<xsl:if test="is_nanomaterial = 'Y'">
															<div class="col-sm-016">
																<span class="labels"> Please indicate the nanomaterial type </span>
																<span class="dossier_enrol"> <xsl:apply-templates select="nanomaterial_details" /> </span>
															</div>
														</xsl:if>
													</div>
													<div class="row">
														<div class="col-sm-099">
															<span class="labels"> Animal/Human Source? </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="is_human_animal_src" /> </span>
														</div>
													</div>
												</div>
											</div>
										</xsl:for-each>
									</div>
								</div>
								
								<!-- Animal and/or Human Sourced Material(s) -->
								<div class="panel panel-warning" style="border-color: red;">
									<header class="panel-warning panel-heading" style="background-color: red; border-color: red;">
										<h3 class="panel-warning panel-title" style="background-color: red; color: white;"> Animal and/or Human Sourced Material(s) </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<xsl:for-each select="material_ingredient">
											<div class="row">
												<div class="well well-sm" >
													<h3 style="margin-left: 5px;"> Material <xsl:value-of select="position()"/> </h3>
													<div class="row">
														<div class="col-sm-024">
															<span class="labels"> Chemical Abstracts Service No. </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="cas_number" /> </span>
														</div>
														<div class="col-sm-024">
															<span class="labels"> Material Name </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="ingredient_name" /> </span>
														</div>
														<div class="col-sm-024">
															<span class="labels"> Standard </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="ingred_standard" /> </span>
														</div>
														<div class="col-sm-024">
															<span class="labels"> Present in Final Container </span>
															<span class="dossier_enrol"> <xsl:apply-templates select="in_final_container" /> </span>
														</div>
													</div>
												</div>
											</div>
										</xsl:for-each>
									</div>
								</div>
							</div>
						</div>
					</xsl:for-each>
					
					<h2 style="margin-left: 5px; color: black;"> Appendix 4 </h2>
					<xsl:for-each select="appendix4_group">
						<div class="well well-sm" >
							<h3 style="margin-left: 5px;"> Ingredient: <xsl:value-of select="ingredient_name" /> </h3>
							<div class="row">
								<div class="col-sm-099">
									<span class="labels"> Animal/Human Source? </span>
									<span class="dossier_enrol">
										<xsl:choose>
											<xsl:when test="animal_sourced = 'Y'">Animal</xsl:when>
											<xsl:when test="human_sourced = 'Y'">Human</xsl:when>
											<xsl:otherwise>No</xsl:otherwise>
										</xsl:choose>
									</span>
								</div>
							</div>
							
							<xsl:if test="(human_sourced = 'Y') or (animal_sourced = 'Y')">
								<div class="panel panel-warning">
									<header class="panel-warning panel-heading" >
										<h3 class="panel-warning panel-title" > Section 1 - Tissues or Fluids of Origin </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<!-- Nervous System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Nervous System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/brain = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Brain
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/brain_stem = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Brain Stem
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/cerebellum = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Cerebellum
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/cerebrospinal_fluid = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Cerebrospinal Fluid
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/dorsal_root_ganglia = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Dorsal Root Ganglia
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/dura_mater = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Dura Mater
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/hypothalamus = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Hypothalamus
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/retina_optic = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Retina/Optic Nerve
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/spinal_cord = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Spinal Cord
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/trigerminal_ganglia = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Trigerminal Ganglia
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_nervous = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_nervous = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the nervous system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_nervous_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Digestive System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Digestive System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/appendix = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Appendix
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/bile = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Bile
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/distal_ileum = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Distal Ileum
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/large_intestine = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Large Intestine
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/saliva_salivary = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Saliva Salivary Gland
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/small_intestine = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Small Intestine other than Distal Ileum
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/stomach = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Stomach
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_digestive = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_digestive = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the digestive system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_digestive_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Reproductive and Urinary System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Reproductive and Urinary System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/milk_products = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Milk/Milk Products
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/kidney = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Kidney
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/colostrum = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Colostrum
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/mammary_glands = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Mammary Glands
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/ovaries = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Ovaries
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/placenta = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Placenta
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/placental_fluid = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Placental Fluid
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/semen = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Semen
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/testes = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Testes
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/urine = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Urine
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_reproductive = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_reproductive = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the reproductive system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_reproductive_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Cardio-Respiratory System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Cardio-Respiratory System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/heart_pericardium = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Heart/Pericardium
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/lung = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Lung
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/nasal_fluid = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Nasal Fluid
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/trachea = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Trachea
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/placental_fluid = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Placental Fluid
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_cardio_respiratory = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_cardio_respiratory = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the cardio-respiratory system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_cardio_respiratory_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Immune System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Immune System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/lymph_nodes = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Lymph Nodes
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/spleen = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Spleen
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/thymus = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Thymus
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/tonsils = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Tonsils
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/ovaries = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Ovaries
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_immune = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_immune = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the immune system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_immune_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Skin and Glandular System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Skin and Glandular System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/adrenal_gland = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Adrenal Gland or Tissue
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/hair_hooves_feathers = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Hair, feathers, hooves
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/liver = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Liver
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/pancreas = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Pancreas
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/pituitary = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Pituitary Gland
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/skin_hides = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Skin/Hides
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/thyroid_parathyroid = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Thyroid/Parathyroid
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_skin_glandular = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_skin_glandular = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the skin or glandular system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_skin_glandular_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Musculo-Skeletal System -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Musculo-Skeletal System </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/abdomen = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Abdomen
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/skull = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Skull
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/bones = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Bones (other than vertebral column or skull)
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/collagen = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Collagen
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/tendons_ligaments = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Tendons/Ligaments
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/vertebral_column = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Vertebral Column
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/muscle = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Muscle
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_musculo_skeletal = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_musculo_skeletal = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the musculo-skeletal system* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_musculo_skeletal_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
										
										<!-- Other Tissues or Fluids -->
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Other Tissues or Fluids </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/adipose = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Adipose or Omentum
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/ascites = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Ascites
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/antler_velvet = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Antler Velvet
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/serum = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Serum
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/whole_blood = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Whole Blood
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/plasma = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Plasma
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/embryonic_tissue = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Embryonic Tissue
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/fetal_tissue = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Fetal Tissue
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/bone_marrow = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Bone Marrow
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/eyes_cornea = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Eyes or Cornea
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/gall_bladder = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Gall Bladder
													</span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels">
														<xsl:element name="input">
															<xsl:attribute name="type">checkbox</xsl:attribute>
															<xsl:if test="tissues_fluids_section/other_fluids_tissues = 'Y'"><xsl:attribute name="checked"></xsl:attribute></xsl:if>
															<xsl:attribute name="disabled">disabled</xsl:attribute>
														</xsl:element>
														Other
													</span>
												</div>
											</div>
											<xsl:if test="tissues_fluids_section/other_fluids_tissues = 'Y'">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Please specify the other types of tissues or fluids* </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="tissues_fluids_section/other_fluids_tissues_details" /> </span>
													</div>
												</div>
											</xsl:if>
										</div>
									</div>
								</div>
							</xsl:if>
							
							<xsl:if test="animal_sourced = 'Y'">
								<div class="panel panel-warning">
									<header class="panel-warning panel-heading" >
										<h3 class="panel-warning panel-title" > Section 2 </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<div class="well well-sm" >
											<h3 style="margin-left: 5px;"> Please provide the animal type(s) used for this ingredient. At least one type must be completed* </h3>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Non-human primate type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/nonhuman_primate_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Aquatic species such as fish, molluscs and crustacean: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/aquatic_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Avian such as chicken, turkey and duck: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/avian_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Bovine such as cattle, bison type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/bovine_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Canine type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/canine_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Caprine such as goat type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/caprine_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Cervidae such as deer, elk (wapiti) and moose type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/cervidae_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Equine such as horse type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/equine_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Feline such as cat type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/feline_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Ovine type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/ovine_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Porcine such as pig type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/porcine_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Rodents such as mouse, hamster, rat and rabbit type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/rodent_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Other animal type: </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/other_type" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Controlled Population </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/is_controlled_pop" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Biotechnology-Derived Animal </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/is_biotech_derived" /> </span>
												</div>
											</div>
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Cell Line </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/is_cell_line" /> </span>
												</div>
											</div>
										</div>
									</div>
								</div>
							
								<div class="panel panel-warning">
									<header class="panel-warning panel-heading" >
										<h3 class="panel-warning panel-title" > Section 3 </h3>
									</header>
									
									<div class="panel-warning panel-body">
										<div class="well well-sm" >
											<div class="row">
												<div class="col-sm-099">
													<span class="labels"> Age of animals (in months) * </span>
													<span class="dossier_enrol"> <xsl:apply-templates select="animal_sourced_section/animal_age" /> </span>
												</div>
											</div>
											<h3 style="margin-left: 5px;"> Please indicate the country(ies) of origin of the animal(s) </h3>
											<xsl:for-each select="animal_sourced_section/country_origin_list/country_origin">
												<div class="row">
													<div class="col-sm-099">
														<span class="labels"> Country of Origin <xsl:value-of select="position()"/> </span>
														<span class="dossier_enrol"> <xsl:apply-templates select="country_with_unknown" /> </span>
														<xsl:if test="country_with_unknown = 'UNK'"><span class="dossier_enrol"> <xsl:apply-templates select="unknown_country_details" /> </span></xsl:if>
													</div>
												</div>
											</xsl:for-each>
										</div>
									</div>
								</div>
							</xsl:if>
						</div>
					</xsl:for-each>					
				</div>		
			</div>
			
			<div class="panel panel-primary">
				<div class="panel-heading">
					<h2 class="panel-title"> Administrative Information for THIS Enrolment Process </h2>
				</div>
				
				<div class="panel-body">
					<xsl:for-each select="contact_record">
						<div class="panel panel-warning">
							<header class="panel-warning panel-heading" >
								<h3 class="panel-warning panel-title" > Contact <xsl:value-of select="position()"/> </h3>
							</header>
							
							<div class="panel-warning panel-body">
								<div class="col-sm-099">
									<h4> Contact Information </h4>
									<div class="well well-sm" >
										<div class="row">
											<div class="col-sm-005">
												<span class="labels"> Salutation </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/salutation" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Given Name </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/given_name" /> </span>
											</div>
											<div class="col-sm-005">
												<span class="labels"> Initials </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/initials" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Surname </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/surname" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Job Title </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/job_title" /> </span>
											</div>
											<div class="col-sm-021">
												<span class="labels"> Language Correspondence </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/language_correspondance" /> </span>
											</div>
										</div>
										<div class="row">
											<div class="col-sm-027">
												<span class="labels"> Phone Number </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/phone_num" /> </span>
											</div>
											<div class="col-sm-008">
												<span class="labels"> Phone Extension </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/phone_ext" /> </span>
											</div>
											<div class="col-sm-027">
												<span class="labels"> Fax Number </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/fax_num" /> </span>
											</div>
											<div class="col-sm-027">
												<span class="labels"> Email </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="rep_contact_details/email" /> </span>
											</div>
											<div class="col-sm-008">
												<span class="labels"> Amended Record? </span>
												<span class="dossier_enrol"> <xsl:apply-templates select="amend_record" /> </span>
											</div>
										</div>
									</div>
								</div>
								
								<div class="col-sm-099">
									<h4> Roles </h4>
									<div class="well well-sm">
										<div class="row">
											<span class="labels"> Types </span>
											<xsl:if test="rep_contact_role = 'PRIMARY'">
												<div class="col-sm-019" >
													<span class="dossier_enrol"> REP Primary Contact </span>
												</div>
											</xsl:if>
											<xsl:if test="rep_contact_role = 'SECONDARY'">
												<div class="col-sm-019" >
													<span class="dossier_enrol"> REP Secondary Contact </span>
												</div>
											</xsl:if>
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
</xsl:stylesheet>