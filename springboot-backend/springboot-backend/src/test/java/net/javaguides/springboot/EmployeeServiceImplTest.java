package net.javaguides.springboot;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;

import java.util.Arrays;
import java.util.List;

import org.apache.coyote.Response;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.util.Assert;

import com.mindtree.employeemanagerapp.controller.EmployeeController;
import com.mindtree.employeemanagerapp.model.Employee;
import com.mindtree.employeemanagerapp.service.EmployeeService;
import com.mindtree.employeemanagerapp.service.serviceimpl.EmployeeServiceImpl;

class EmployeeServiceImplTest {

	
	
	@Test
	public void usingMockito() {
		EmployeeService employeeService = mock(EmployeeService.class);
		List<String> Allemployees = Arrays.asList("Guna",
				"Duraisamy");
		when(employeeService.getEmployeeById(1)).thenReturn(Allemployees);
		EmployeeSeviceImpl employeeServiceImpl = new EmployeeServiceImpl(employeeService);
		List<String> todos = EmployeeServiceImpl.getEmployeeByName("Duraisamy");
		assertEquals(2, todos.size());
	}
	
	@Test
	public void firstMockTest() 
	{
	    //Creating a mock using the PowerMockito.mock
	    //method for the EmployeeService class.
	    EmployeeService mock =PowerMockito.mock(EmployeeService.class);
	 
	    //Next statement essentially says that when getProjectedEmployeeCount method
	    //is called on the mocked EmployeeService instance, return 8.
	    PowerMockito.when(mock.getEmployeeCount()).thenReturn(8);
	 
	    EmployeeController employeeController = new EmployeeController(mock);
	     
	    Assert.assertEquals(16, employeeController.getProjectedEmployeeCount());
	}
	
	@Test
	public void mockSettingsTest() {
	    EmployeeService mock =PowerMockito.mock(EmployeeService.class, Mockito
	        .withSettings()
	        .name("EmployeeServiceMock")
	        .verboseLogging());
	    EmployeeController employeeController = new EmployeeController(mock);
	 
	    Employee employee = new Employee();
	    employeeController.saveEmployee(employee);
	 
	    //Verifying that controller did call the
	    //saveEmployee method on the mocked service
	    //instance.
	    Mockito.verify(mock).saveEmployee(employee);
	}
	
	@Test
	public void getEmployeeTest() throws Exception {
		int id = 2;
		MvcResult result = mockMvc
				.perform(
						MockMvcRequestBuilders.get("/api/employees/" + id)
								.contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		Response response = om.readValue(resultContent, Response.class);
		Assert.assertTrue(response.isSuccess() == true);
	}
	
	@Test
	public void getAllEmployeeTest() throws Exception {
		MvcResult result = mockMvc
				.perform(
						MockMvcRequestBuilders.get("/api/employees")
								.contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		Response response = om.readValue(resultContent, Response.class);
		Assert.assertTrue(response.isSuccess() == true);
	}
	
	@Test
	public void deleteEmployeeTest() throws Exception {
		int id = 3;
		MvcResult result = mockMvc
				.perform(
						MockMvcRequestBuilders.delete("/api/employees/" + id)
								.contentType(MediaType.APPLICATION_JSON_VALUE))
				.andExpect(MockMvcResultMatchers.status().isOk()).andReturn();
		String resultContent = result.getResponse().getContentAsString();
		Response response = om.readValue(resultContent, Response.class);
		Assert.assertTrue(response.isSuccess() == true);
	}
}