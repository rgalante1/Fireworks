CREATE PROCEDURE fireworks.Delete_User(IN IDUser INT)
BEGIN
		BEGIN
		DECLARE `Rollback_val` BOOL DEFAULT 0; 
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `Rollback_val` = 1; 
		
		DELETE FROM meetingRSVP WHERE userid = IDUser;
		
		IF `Rollback_val` THEN
		ROLLBACK;
		ELSE 
		COMMIT;
		END IF;
	
	END; 

	BEGIN
		DECLARE `Rollback_val2` BOOL DEFAULT 0;
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `Rollback_val2` = 1; 
	
		DELETE FROM friendInvites WHERE senderID = IDUser;
	
		IF `Rollback_val2` THEN
		ROLLBACK;
		ELSE 
		COMMIT;
		END IF;
	
	END;

	BEGIN
		DECLARE `Rollback_val3` BOOL DEFAULT 0;
		DECLARE CONTINUE HANDLER FOR SQLEXCEPTION SET `Rollback_val3` = 1; 
	
		DELETE FROM user WHERE userID = IDUser;
	
		IF `Rollback_val3` THEN
		ROLLBACK;
		ELSE 
		COMMIT;
		END IF;
	
	END;

END

