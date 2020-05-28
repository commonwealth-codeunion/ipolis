<?php 
	// Параметры подключения к вашему облачному Битрикс24
	define('CRM_HOST', 'b24-g852nq.bitrix24.kz'); // укажите здесь ваш домен в Битрикс
	define('CRM_PORT', '443'); // порт для подключения. Здесь оставляем все как есть
	define('CRM_PATH', '/crm/configs/import/lead.php'); // Путь к PHP файлу, к которому будем подлючаться. Здесь оставляем все как есть

	// Параметры авторизации
	define('CRM_LOGIN', 'c10ver.obj@gmail.com'); // логин пользователя, которого мы создали для подключения
	define('CRM_PASSWORD', 'zxswe123'); // пароль пользователя CRM


	$phone = $_POST['phone'];

	// Начинаем обработку внутри скрипта
	if ($_SERVER['REQUEST_METHOD'] == 'POST')
	{
		// Представляем массив
		$postData = array(
			'TITLE' => "Заявка на полис",
			'PHONE_WORK' => $phone,
			'NAME' => 'IPOLIS'
		);

		// добавляем в массив параметры авторизации
		if (defined('CRM_AUTH'))
		{
			$postData['AUTH'] = CRM_AUTH;
		}
		else
		{
			$postData['LOGIN'] = CRM_LOGIN;
			$postData['PASSWORD'] = CRM_PASSWORD;
		}

		// Открываем сокет соединения к облачной CRM
		$fp = fsockopen("ssl://".CRM_HOST, CRM_PORT, $errno, $errstr, 30);
		if ($fp)
		{
			// Производим URL-кодирование строки
			$strPostData = '';
			foreach ($postData as $key => $value)
				$strPostData .= ($strPostData == '' ? '' : '&').$key.'='.urlencode($value);

			// Подготавливаем заголовки
			$str = "POST ".CRM_PATH." HTTP/1.0\r\n";
			$str .= "Host: ".CRM_HOST."\r\n";
			$str .= "Content-Type: application/x-www-form-urlencoded\r\n";
			$str .= "Content-Length: ".strlen($strPostData)."\r\n";
			$str .= "Connection: close\r\n\r\n";

			$str .= $strPostData;

			fwrite($fp, $str);

			$result = '';
			while (!feof($fp))
			{
				$result .= fgets($fp, 128);
			}
			fclose($fp);

			$response = explode("\r\n\r\n", $result);

			$output = print_r($response[1], 1);
			echo $output;
		}
		else
		{
			echo 'Не удалось подключиться к CRM '.$errstr.' ('.$errno.')';
		}
	}
	else
	{
		echo "Request is invalid :(";
	}
?>