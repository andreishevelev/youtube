import undetected_chromedriver.v2 as uc
from selenium.webdriver.common.by import By
from time import sleep

username = 'sheveleva.oksana.34@gmail.com'
password ='20LDFLWFNM'

driver = uc.Chrome()

driver.delete_all_cookies()

for x in range(10):

  try:
    driver.get(r'https://accounts.google.com/signin/v2/identifier?continue='+\
    'https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&sacu=1&rip=1'+\
    '&flowName=GlifWebSignIn&flowEntry = ServiceLogin')
    driver.implicitly_wait(15)

    loginBox = driver.find_element(By.XPATH,
      '//input[@name="identifier"]')
    loginBox.send_keys(username)

    nextButton = driver.find_element(By.XPATH,
      '//button[.="Next"]')
    nextButton.click()

    sleep(3)

    passWordBox = driver.find_element(By.XPATH,
      '//input[@type="password"]')
    passWordBox.send_keys(password)

    sleep(3)

    nextButton = driver.find_element(By.XPATH,
      '//button[.="Next"]')
    nextButton.click()

    sleep(5)

    driver.get(r'https://www.youtube.com')

    sleep(5)

    avatarDD = driver.find_element(By.XPATH,
      '//button[@id="avatar-btn"]')
    avatarDD.click()

    sleep(1)

    signOut = driver.find_element(By.XPATH,
      '//*[@id="label"][.="Sign out"]')
    signOut.click()

    sleep(5)




    print('Login Successful...!!')
  except:
    print('error')
    sleep(500)
