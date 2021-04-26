CREATE PROCEDURE fireworks.Delete_metting(IN IDMetting INT)
BEGIN
	BEGIN
		DECLARE `Rollback_val` BOOL DEFAULT 0; 
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `Rollback_val` = 1; 
		
		DELETE FROM rating WHERE meeting = IDMetting;
		
		IF `Rollback_val` THEN
		ROLLBACK;
		ELSE 
		COMMIT;
		END IF;
	
	END; 

	BEGIN
		DECLARE `Rollback_val2` BOOL DEFAULT 0;
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `Rollback_val2` = 1; 
	
		DELETE FROM meeting WHERE meetingID = IDMetting;
	
		IF `Rollback_val2` THEN
		ROLLBACK;
		ELSE 
		COMMIT;
		END IF;
	
	END;

END